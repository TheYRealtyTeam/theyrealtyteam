import { sanitizeInput, sanitizeConversationHistory } from './sanitizer.ts';

export interface RequestData {
  message: string;
  conversationHistory?: Array<{ role: string; content: string }>;
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

export const validateRequest = async (req: Request): Promise<{ message: string; conversationHistory?: Array<{ role: string; content: string }> } | Response> => {
  // Validate request method
  if (req.method !== 'POST') {
    return createErrorResponse("Method not allowed", 405);
  }

  // Validate content type
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return createErrorResponse("Invalid content type. Expected application/json", 400);
  }

  // Parse and validate request body
  let requestData: RequestData;
  try {
    requestData = await req.json();
  } catch (parseError) {
    console.error("JSON parsing error:", parseError);
    return createErrorResponse("Invalid JSON in request body", 400);
  }

  const { message, conversationHistory } = requestData;

  // Validate message
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return createErrorResponse("Message is required and must be a non-empty string", 400);
  }

  // Validate message length (prevent abuse)
  if (message.length > 2000) {
    return createErrorResponse("Message too long. Maximum 2000 characters allowed", 400);
  }

  // Sanitize input to prevent prompt injection
  const sanitizationResult = sanitizeInput(message);
  
  if (!sanitizationResult.isSafe) {
    console.warn("Unsafe input detected:", sanitizationResult.warnings);
    return createErrorResponse(
      "Your message contains content that cannot be processed. Please rephrase your question.",
      400
    );
  }

  if (sanitizationResult.warnings.length > 0) {
    console.warn("Input warnings:", sanitizationResult.warnings);
  }

  // Sanitize conversation history
  const sanitizedHistory = conversationHistory 
    ? sanitizeConversationHistory(conversationHistory)
    : undefined;

  return { 
    message: sanitizationResult.sanitizedMessage, 
    conversationHistory: sanitizedHistory 
  };
};
