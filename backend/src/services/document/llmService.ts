import Groq from "groq-sdk";


const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY is not defined");
}

const groq = new Groq({
  apiKey,
});

const LLM_MODEL = "openai/gpt-oss-20b";

export const generateAnswer = async (
  question: string,
  context: string
): Promise<string> => {
  try {
    if (!question.trim()) {
      throw new Error("Question cannot be empty");
    }

    if (!context.trim()) {
      throw new Error("Context cannot be empty");
    }

    const completion = await groq.chat.completions.create({
      model: LLM_MODEL,

      messages: [
        {
          role: "system",
          content: `
            You are a helpful and friendly AI document assistant.

            1. GREETINGS: If the user says casual greetings like "hi", "hey", "hello", or similar, respond back in a friendly, conversational way (e.g., "Hello! How can I help you with this document today?"). Do not look at the document for greetings.
            2. DOCUMENT QUERIES: Answer the user's question using ONLY the provided document context.
            3. NOT FOUND: If the question is about the document but the answer is not present in the context, say that the information is not available in the uploaded document.
            4. FORMATTING RULE: Do NOT use any markdown formatting like asterisks (** or *). Keep the text clean, plain, and human-friendly.
            5. Do not make up information.`.trim(),
        },
        {
          role: "user",
          content: `DOCUMENT CONTEXT:${context}USER QUESTION:${question}`.trim(),
        },
      ],

      temperature: 0.2,
      max_tokens: 1000,
    });

    const answer =
      completion.choices[0]?.message?.content;

    if (!answer) {
      throw new Error("Groq returned an empty response");
    }

    return answer.trim();
  } catch (error) {
    console.error("LLM generation error:", error);

    throw new Error("Failed to generate AI response");
  }
};