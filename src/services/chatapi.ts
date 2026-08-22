import api from "./api";


// Create new chat
export const createChat = async (
  documentId: string
) => {
  const response = await api.post("/chat/create", {
    documentId,
  });

  return response.data;
};

// Get all chats
export const getChats = async () => {
  const response = await api.get("/chat/getchats");

  return response.data;
};

// Get single chat
export const getChatById = async (
  id: string
) => {
  const response = await api.get(
    `/chat/get-chat/${id}`
  );

  return response.data;
};

// Send message
export const sendMessage = async (
  chatId: string,
  message: string
) => {
  const response = await api.post(
    `/chat/send-msg/${chatId}`,
    {
      message,
    }
  );

  return response.data;
};

// Delete chat
export const deleteChat = async (
  id: string
) => {
  const response = await api.delete(
    `/chat/delete/${id}`
  );

  return response.data;
};