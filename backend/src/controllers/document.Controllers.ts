import { Request, Response } from "express";
import DocumentModel from "../models/document.models.js";

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

    // Only allow PDF
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        message: "Only PDF files are allowed",
      });
      
    }

    // Create document record
    const document = await DocumentModel.create({
      userId,
      name: req.file.originalname,
      originalName: req.file.originalname,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      status: "processing",
    });

    /*
    TODO:
      PDF processing will happen here later:

      1. Extract text from PDF
      2. Split text into chunks
      3. Generate embeddings
      4. Store chunks + embeddings in Chroma
      5. Update document status to "ready"
    */

   return res.status(201).json({
      message: "Document uploaded successfully",
      document,
    });
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

    /*
      TODO: Delete corresponding Chroma vectors

      await deleteDocumentVectors(id);
    */

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