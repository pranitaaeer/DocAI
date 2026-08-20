import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const ai = new GoogleGenAI({
  apiKey,
});

const EMBEDDING_MODEL = "gemini-embedding-001";

/**
 * Generate embedding for a document chunk
 */
export const generateDocumentEmbedding = async (
  text: string
): Promise<number[]> => {
  try {
    if (!text.trim()) {
      throw new Error("Document text cannot be empty");
    }

    const response = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: text,
      config: {
        taskType: "RETRIEVAL_DOCUMENT",
      },
    });

    const embedding = response.embeddings?.[0]?.values;

    if (!embedding) {
      throw new Error("Failed to generate document embedding");
    }

    return embedding;
  } catch (error) {
    console.error(
      "Document embedding error:",
      error
    );

    throw new Error(
      "Failed to generate document embedding"
    );
  }
};


/**
 * Generate embeddings for multiple document chunks
 */
export const generateDocumentEmbeddings = async (
  texts: string[]
): Promise<number[][]> => {
  try {
    if (!texts.length) {
      return [];
    }

    const response = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: texts,
      config: {
        taskType: "RETRIEVAL_DOCUMENT",
      },
    });

    const embeddings = response.embeddings?.map(
      (embedding) => embedding.values
    );

    if (!embeddings || embeddings.length !== texts.length) {
      throw new Error(
        "Failed to generate document embeddings"
      );
    }

    return embeddings as number[][];
  } catch (error) {
    console.error(
      "Document embeddings error:",
      error
    );

    throw new Error(
      "Failed to generate document embeddings"
    );
  }
};


/**
 * Generate embedding for user's search question
 */
export const generateQueryEmbedding = async (
  query: string
): Promise<number[]> => {
  try {
    if (!query.trim()) {
      throw new Error("Query cannot be empty");
    }

    const response = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: query,
      config: {
        taskType: "RETRIEVAL_QUERY",
      },
    });

    const embedding = response.embeddings?.[0]?.values;

    if (!embedding) {
      throw new Error("Failed to generate query embedding");
    }

    return embedding;
  } catch (error) {
    console.error(
      "Query embedding error:",
      error
    );

    throw new Error(
      "Failed to generate query embedding"
    );
  }
};