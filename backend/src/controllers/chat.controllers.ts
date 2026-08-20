import { Request, Response } from "express";
import Chat from "../models/chat.models.js";
import DocumentModel from "../models/document.models.js";

/**
 * Create a new chat for a document
 */
export const createChat = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?._id;
    const { documentId } = req.body;

    if (!userId) {
     return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!documentId) {
     return res.status(400).json({
        message: "Document ID is required",
      });
    }

    // Make sure document belongs to the logged-in user
    const document = await DocumentModel.findOne({
      _id: documentId,
      userId,
    });

    if (!document) {
     return res.status(404).json({
        message: "Document not found",
      });
    }

    // Document should be processed before chatting
    if (document.status !== "ready") {
     return res.status(400).json({
        message: "Document is not ready for chat",
      });
    }

    const chat = await Chat.create({
      userId,
      documentId,
      messages: [],
    });

   return res.status(201).json({
      message: "Chat created successfully",
      chat,
    });
  } catch (error) {
    console.error("Create chat error:", error);

   return res.status(500).json({
      message: "Failed to create chat",
    });
  }
};


/**
 * Get all chats of the logged-in user
 */
export const getChats = async (
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

    const chats = await Chat.find({
      userId,
    })
      .populate("documentId", "name originalName")
      .sort({
        updatedAt: -1,
      });

    return res.status(200).json({
      chats,
    });
  } catch (error) {
    console.error("Get chats error:", error);

   return res.status(500).json({
      message: "Failed to fetch chats",
    });
  }
};


/**
 * Get a single chat
 */
export const getChatById = async (
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

    const chat = await Chat.findOne({
      _id: id,
      userId,
    }).populate("documentId", "name originalName");

    if (!chat) {
     return res.status(404).json({
        message: "Chat not found",
      });
    }

   return res.status(200).json({
      chat,
    });
  } catch (error) {
    console.error("Get chat error:", error);

   return res.status(500).json({
      message: "Failed to fetch chat",
    });
  }
};


/**
 * Send a message and generate an AI response
 */
export const sendMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;
    const { message } = req.body;

    if (!userId) {
     return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    // Find user's chat
    const chat = await Chat.findOne({
      _id: id,
      userId,
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    /*
     TODO: RAG PIPELINE WILL COME HERE

      1. Convert user question into embedding

      2. Search Chroma using question embedding

      3. Get relevant document chunks

      4. Build context from those chunks

      5. Send context + question to Gemini/Groq

      6. Get AI response

      7. Save both messages to MongoDB
    */

    // Temporary response until RAG is connected
    const aiResponse =
      "AI response will be generated from the uploaded document.";

    // Save user's message
    chat.messages.push({
      role: "user",
      content: message.trim(),
      createdAt: new Date(),
    });

    // Save AI message
    chat.messages.push({
      role: "assistant",
      content: aiResponse,
      createdAt: new Date(),
    });

    await chat.save();

   return res.status(200).json({
      message: "Message processed successfully",
      answer: aiResponse,
      chat,
    });
  } catch (error) {
    console.error("Send message error:", error);

   return res.status(500).json({
      message: "Failed to process message",
    });
  }
};


/**
 * Delete a chat
 */
export const deleteChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const chat = await Chat.findOne({
      _id: id,
      userId,
    });

    if (!chat) {
      res.status(404).json({
        message: "Chat not found",
      });
      return;
    }

    await Chat.deleteOne({
      _id: id,
      userId,
    });

    res.status(200).json({
      message: "Chat deleted successfully",
    });
  } catch (error) {
    console.error("Delete chat error:", error);

    res.status(500).json({
      message: "Failed to delete chat",
    });
  }
};