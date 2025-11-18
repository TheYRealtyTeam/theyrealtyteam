import { getSystemPrompt } from './systemPrompt.ts';

export interface ChatMessage {
  role: string;
  content: string;
}

const createErrorResponse = (error: string, status: number) => {
  return new Response(
    JSON.stringify({ error }),
    { 
      status,
      headers: { "Content-Type": "application/json" }
    }
  );
};

export const callOpenAI = async (
  message: string, 
  conversationHistory?: Array<{ role: string; content: string }>,
  properties?: Array<any>
): Promise<string | Response> => {
  // Get and validate Lovable AI API key
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) {
    console.error("Lovable AI API key not configured");
    return createErrorResponse("AI service not configured. Please contact support.", 500);
  }

  // Prepare conversation messages with enhanced system prompt
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: getSystemPrompt(properties)
    }
  ];

  // Add conversation history if provided
  if (conversationHistory && Array.isArray(conversationHistory)) {
    // Limit history to last 10 messages to prevent token limit issues
    const recentHistory = conversationHistory.slice(-10);
    messages.push(...recentHistory);
  }

  // Add current user message
  messages.push({
    role: "user",
    content: message
  });

  console.log("Sending request to Lovable AI with", messages.length, "messages");

  try {
    // Call Lovable AI Gateway (compatible with OpenAI API)
    const openAiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: messages,
        max_completion_tokens: 800,
      }),
    });

    // Check if AI Gateway request was successful
    if (!openAiResponse.ok) {
      const errorText = await openAiResponse.text();
      console.error("Lovable AI Gateway error:", openAiResponse.status, errorText);
      
      let errorMessage = "AI service temporarily unavailable. Please try again.";
      
      if (openAiResponse.status === 401) {
        errorMessage = "AI service authentication failed. Please contact support.";
      } else if (openAiResponse.status === 429) {
        errorMessage = "Rate limit exceeded. Please wait a moment and try again.";
      } else if (openAiResponse.status === 402) {
        errorMessage = "AI service credits depleted. Please contact support to add credits.";
      } else if (openAiResponse.status >= 500) {
        errorMessage = "AI service is experiencing issues. Please try again later.";
      }

      return createErrorResponse(errorMessage, 503);
    }

    // Parse OpenAI response
    let openAiData;
    try {
      openAiData = await openAiResponse.json();
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      return createErrorResponse("Invalid response from AI service", 502);
    }

    // Validate OpenAI response structure
    if (!openAiData || !openAiData.choices || !Array.isArray(openAiData.choices) || openAiData.choices.length === 0) {
      console.error("Invalid OpenAI response structure:", openAiData);
      return createErrorResponse("Invalid response from AI service", 502);
    }

    const choice = openAiData.choices[0];
    if (!choice || !choice.message || !choice.message.content) {
      console.error("Invalid choice structure in OpenAI response:", choice);
      return createErrorResponse("Invalid response from AI service", 502);
    }

    const aiResponse = choice.message.content.trim();

    // Validate response content
    if (!aiResponse) {
      console.error("Empty response from OpenAI");
      return createErrorResponse("AI service returned empty response", 502);
    }

    console.log("Successfully generated AI response");
    return aiResponse;

  } catch (error) {
    console.error("Error calling Lovable AI Gateway:", error);
    return createErrorResponse("AI service temporarily unavailable. Please try again.", 503);
  }
};
