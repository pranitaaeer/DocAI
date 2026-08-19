import mongoose, { Document, Schema, Types } from "mongoose";

export interface IDocument extends Document {
  userId: Types.ObjectId;
  name: string;
  originalName: string;
  fileUrl?: string;
  fileSize?: number;
  mimeType: string;
  status: "processing" | "ready" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

const documentSchema = new Schema<IDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
    },

    fileSize: {
      type: Number,
    },

    mimeType: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["processing", "ready", "failed"],
      default: "processing",
    },
  },
  {
    timestamps: true,
  }
);

const DocumentModel = mongoose.model<IDocument>("Document",documentSchema);

export default DocumentModel;