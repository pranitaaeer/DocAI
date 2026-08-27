import { create } from "zustand";
import { DocumentState } from "../types/store.type";
import {
  getDocuments,
  uploadDocument,
  getDocumentById,
  deleteDocument,
} from "../services/docapi";



export const useDocumentStore =
  create<DocumentState>((set) => ({
    documents: [],
    selectedDocument: null,

    isLoading: false,
    isUploading: false,

    error: null,

    // Get all documents
    fetchDocuments: async () => {
      try {
        set({
          isLoading: true,
          error: null,
        });

        const response = await getDocuments();

        set({
          documents: response.documents,
        });
        return response
      } catch (error: any) {
        set({
          error:
            error?.response?.data?.message ||
            "Failed to fetch documents",
        });
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    // Upload document
    upload: async (file) => {
      try {
        set({
          isUploading: true,
          error: null,
        });

        const response =
          await uploadDocument(file);

        const document =
          response.document;

        // Add newly uploaded document
        set((state) => ({
          documents: [
            document,
            ...state.documents,
          ],
        }));

        return document;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to upload document";

        set({
          error: message,
        });

        throw error;
      } finally {
        set({
          isUploading: false,
        });
      }
    },

    // Get single document
    fetchDocument: async (id) => {
      try {
        set({
          isLoading: true,
          error: null,
        });

        const response =
          await getDocumentById(id);

        set({
          selectedDocument:
            response.document,
        });
        return response
      } catch (error: any) {
        set({
          error:
            error?.response?.data?.message ||
            "Failed to fetch document",
        });
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    // Delete document
    removeDocument: async (id) => {
      try {
        set({
          error: null,
        });

        const response = await deleteDocument(id);

        set((state) => ({
          documents:
            state.documents.filter(
              (doc) => doc._id !== id
            ),

          selectedDocument:
            state.selectedDocument?._id === id
              ? null
              : state.selectedDocument,
        }));
        return response
      } catch (error: any) {
        set({
          error:
            error?.response?.data?.message ||
            "Failed to delete document",
        });

        throw error;
      }
    },

    clearSelectedDocument: () => {
      set({
        selectedDocument: null,
      });
    },
  }));