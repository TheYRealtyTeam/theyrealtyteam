import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({ error: "Invalid content type" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { message } = await req.json();
    if (!message) {
      return new Response(
        JSON.stringify({ error: "No message provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    const assistant_id = "asst_Lavu1npRoD3YMFXFxIGRxK4y";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "OpenAI-Beta": "assistants=v2"
    };

    // 1. Create thread
    const threadRes = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers
    });
    const threadData = await threadRes.json();
    const thread_id = threadData.id;

    // 2. Add message
    await fetch(`https://api.openai.com/v1/threads/${thread_id}/messages`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        role: "user",
        content: message
      })
    });

    // 3. Run the assistant
    const runRes = await fetch(`https://api.openai.com/v1/threads/${thread_id}/runs`, {
      method: "POST",
      headers,
      body: JSON.stringify({ assistant_id })
    });
    const runData = await runRes.json();
    const run_id = runData.id;

    // 4. Poll until complete
    let status = "queued";
    let attempts = 0;
    while (status !== "completed" && attempts < 10) {
      await new Promise(res => setTimeout(res, 2000));
      const check = await fetch(
        `https://api.openai.com/v1/threads/${thread_id}/runs/${run_id}`,
        { method: "GET", headers }
      );
      const checkData = await check.json();
      status = checkData.status;
      attempts++;
    }

    // 5. Retrieve messages
    const messagesRes = await fetch(
      `https://api.openai.com/v1/threads/${thread_id}/messages`,
      {
        method: "GET",
        headers
      }
    );
    const messagesData = await messagesRes.json();

    if (!messagesData || !Array.isArray(messagesData.data)) {
      throw new Error("Invalid response structure from OpenAI");
    }

    const lastMessage = messagesData.data.find(msg => msg.role === "assistant");
    const reply = lastMessage?.content?.[0]?.text?.value || "Sorry, I couldn’t respond.";

    return new Response(JSON.stringify({ response: reply }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
