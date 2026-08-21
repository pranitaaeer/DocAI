import api from "./api";


// Get all documents
export const getDocuments = async () => {
  const response = await api.get("/doc/get-docs");

  return response.data ;
};

// Upload document
export const uploadDocument = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/doc/upload",
    formData
  );

  
  return response.data;
};

// Get single document
export const getDocumentById = async (
  id: string
) => {
  const response = await api.get(
    `/doc/get-doc/${id}`
  );

  return response.data;
};

// Delete document
export const deleteDocument = async (
  id: string
) => {
  const response = await api.delete(
    `/doc/delete/${id}`
  );

  return response.data;
};