import { create } from "zustand";

import {
  createChat,
  getChats,
  getChatById,
  sendMessage,
  deleteChat,
} from "../services/chatapi";
import { ChatState, ChatMessage } from "../types/store.type"



export const useChatStore =
  create<ChatState>((set, get) => ({
    chats: [],
    currentChat: null,
    messages: [],

    isLoading: false,
    isSending: false,

    error: null,

    // Create chat
    createNewChat: async (documentId) => {
      try {
        set({
          isLoading: true,
          error: null,
        });

        const response =
          await createChat(documentId);

        const chat = response.chat;

        set((state) => ({
          chats: [
            chat,
            ...state.chats,
          ],
          currentChat: chat,
          messages: chat.messages || [],
        }));

        return chat;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to create chat";

        set({
          error: message,
        });

        throw error;
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    // Get all chats
    fetchChats: async () => {
      try {
        set({
          isLoading: true,
          error: null,
        });

        const response =
          await getChats();

        set({
          chats: response.chats,
        });
        return response
      } catch (error: any) {
        set({
          error:
            error?.response?.data?.message ||
            "Failed to fetch chats",
        });
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    // Get single chat
    fetchChat: async (id) => {
      try {
        set({
          isLoading: true,
          error: null,
        });

        const response =
          await getChatById(id);

        const chat = response.chat;

        set({
          currentChat: chat,
          messages: chat.messages || [],
        });
        return response
      } catch (error: any) {
        set({
          error:
            error?.response?.data?.message ||
            "Failed to fetch chat",
        });
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    // Send message
    send: async (message) => {
      const currentChat =
        get().currentChat;

      if (!currentChat) {
        throw new Error(
          "No active chat"
        );
      }

      try {
        set({
          isSending: true,
          error: null,
        });

        // Immediately show user's message
        const userMessage: ChatMessage = {
          role: "user",
          content: message,
          createdAt:
            new Date().toISOString(),
        };

        set((state) => ({
          messages: [
            ...state.messages,
            userMessage,
          ],
        }));

        // Send to backend
        const response =
          await sendMessage(
            currentChat._id,
            message
          );

        // Backend returns complete chat
        const updatedChat =
          response.chat;

        set({
          currentChat: updatedChat,
          messages:
            updatedChat.messages || [],
        });

        // Update chat in chat list
        set((state) => ({
          chats: state.chats.map(
            (chat) =>
              chat._id ===
                updatedChat._id
                ? updatedChat
                : chat
          ),
        }));
        return updatedChat
      } catch (error: any) {
        set({
          error:
            error?.response?.data?.message ||
            "Failed to send message",
        });
      } finally {
        set({
          isSending: false,
        });
      }
    },

    // Delete chat
    removeChat: async (id) => {
      try {
        set({
          error: null,
        });

        const response = await deleteChat(id);

        set((state) => ({
          chats:
            state.chats.filter(
              (chat) =>
                chat._id !== id
            ),

          currentChat:
            state.currentChat?._id === id
              ? null
              : state.currentChat,

          messages:
            state.currentChat?._id === id
              ? []
              : state.messages,
        }));
        return response
      } catch (error: any) {
        set({
          error:
            error?.response?.data?.message ||
            "Failed to delete chat",
        });

        throw error;
      }
    },

    clearCurrentChat: () => {
      set({
        currentChat: null,
        messages: [],
      });
    },
  }));