//jo bhi text arha hai usko small small chunks mein todna hai

/**
 * Split document text into overlapping chunks.
 */
export const splitTextIntoChunks = (
  text: string,
  chunkSize: number = Number(process.env.DEFAULT_CHUNK_SIZE),
  overlap: number = Number(process.env.DEFAULT_CHUNK_OVERLAP)
): string[] => {
  if (!text || !text.trim()) {
    return [];
  }

  if (overlap >= chunkSize) {
    throw new Error(
      "Chunk overlap must be smaller than chunk size"
    );
  }

  // Clean unnecessary whitespace
  const cleanedText = text
    .replace(/\s+/g, " ")
    .trim();

  const chunks: string[] = [];

  let start = 0;

  while (start < cleanedText.length) {
    const end = Math.min(
      start + chunkSize,
      cleanedText.length
    );

    const chunk = cleanedText
      .slice(start, end)
      .trim();

    if (chunk) {
      chunks.push(chunk);
    }

    // Stop when we reach the end
    if (end >= cleanedText.length) {
      break;
    }

    // Move forward while keeping overlap
    start = end - overlap;
  }

  return chunks;
};