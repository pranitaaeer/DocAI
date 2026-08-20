import { PDFParse } from "pdf-parse";

// ai document ke anadar ka data read kr ske isliye text ko extract krna hai

export const extractTextFromPdf = async (
  buffer: Buffer
): Promise<string> => {
  try {
    const parser = new PDFParse({
      data: buffer,
    });

    const result = await parser.getText();

    await parser.destroy();

    return result.text;
  } catch (error) {
    console.error("PDF text extraction error:", error);

    throw new Error("Failed to extract text from PDF");
  }
};