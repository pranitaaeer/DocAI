import { Request, Response } from "express";
import DocumentModel from "../models/document.models.js";
import { extractTextFromPdf } from "../services/document/pdfService.js";
import { splitTextIntoChunks } from "../services/document/chunkService.js";
import { generateDocumentEmbeddings } from "../services/document/embeddingService.js";
import { addDocumentChunks, deleteDocumentChunks } from "../services/document/chromaService.js";

/**
 * Get all documents belonging to the logged-in user
 */
export const getDocuments = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });

    }

    const documents = await DocumentModel.find({
      userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      documents,
    });
  } catch (error) {
    console.error("Get documents error:", error);

    return res.status(500).json({
      message: "Failed to fetch documents",
    });
  }
};

/**
 * Upload a document
 *
 * Flow:
 * PDF upload
 * → create document record
 * → later process PDF
 * → generate embeddings
 * → store chunks in Chroma
 */
export const uploadDocument = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF file",
      });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        message: "Only PDF files are allowed",
      });
    }

    // 1. Create document record
    const document = await DocumentModel.create({
      userId,
      name: req.file.originalname,
      originalName: req.file.originalname,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      status: "processing",
    });

    try {
      // 2. Extract text from PDF
      const text = await extractTextFromPdf(
        req.file.buffer
      );

      if (!text.trim()) {
        await DocumentModel.findByIdAndUpdate(
          document._id,
          { status: "failed" }
        );

        return res.status(400).json({
          message: "Could not extract text from PDF",
        });
      }

      // 3. Split text into chunks
      const chunks = splitTextIntoChunks(text);

      if (!chunks.length) {
        await DocumentModel.findByIdAndUpdate(
          document._id,
          { status: "failed" }
        );

        return res.status(400).json({
          message: "No readable content found in PDF",
        });
      }

      // 4. Generate embeddings
      const embeddings =
        await generateDocumentEmbeddings(chunks);

      // 5. Store chunks + embeddings in Chroma
      await addDocumentChunks(
        document._id.toString(),
        chunks,
        embeddings
      );

      // 6. Mark document as ready
      const updatedDocument =
        await DocumentModel.findByIdAndUpdate(
          document._id,
          {
            status: "ready",
          },
          { new: true }
        );

      return res.status(201).json({
        message: "Document uploaded and processed successfully",
        document: updatedDocument,
      });
    } catch (processingError) {
      console.error(
        "Document processing error:",
        processingError
      );

      // Mark document as failed
      await DocumentModel.findByIdAndUpdate(
        document._id,
        {
          status: "failed",
        }
      );

      return res.status(500).json({
        message: "Document uploaded but processing failed",
      });
    }
  } catch (error) {
    console.error("Upload document error:", error);

    return res.status(500).json({
      message: "Failed to upload document",
    });
  }
};

/**
 * Get a single document
 */
export const getDocumentById = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });

    }

    const document = await DocumentModel.findOne({
      _id: id,
      userId,
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });

    }

    res.status(200).json({
      document,
    });
  } catch (error) {
    console.error("Get document error:", error);

    return res.status(500).json({
      message: "Failed to fetch document",
    });
  }
};


/**
 * Delete a document
 *
 * MongoDB document will be deleted.
 * Later, the corresponding Chroma vectors will also be deleted.
 */
export const deleteDocument = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });

    }

    const document = await DocumentModel.findOne({
      _id: id,
      userId,
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });

    }

    await deleteDocumentChunks(
      document._id.toString()
    );

    await DocumentModel.deleteOne({
      _id: id,
      userId,
    });

    return res.status(200).json({
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Delete document error:", error);

    return res.status(500).json({
      message: "Failed to delete document",
    });
  }
};