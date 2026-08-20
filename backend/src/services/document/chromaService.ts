import chromaClient from "../../config/chroma.js";


/**
 * Get or create the main Chroma collection
 */
export const getDocumentCollection = async () => {
    try {
        const collection = await chromaClient.getOrCreateCollection({
            name: process.env.COLLECTION_NAME!,
        });

        return collection;
    } catch (error) {
        console.error("Chroma collection error:", error);
        throw new Error("Failed to get Chroma collection");
    }
};


/**
 * Add document chunks and their embeddings to Chroma
 */
export const addDocumentChunks = async (
    documentId: string,
    chunks: string[],
    embeddings: number[][],
) => {
    try {
        if (chunks.length !== embeddings.length) {
            throw new Error(
                "Chunks and embeddings must have the same length"
            );
        }

        const collection = await getDocumentCollection();

        const ids = chunks.map(
            (_, index) => `${documentId}-chunk-${index}`
        );
        console.log("ids", ids);
        const metadatas = chunks.map(() => ({
            documentId,
        }));
        console.log("metadata:", metadatas)
        await collection.add({
            ids,
            documents: chunks,
            embeddings,
            metadatas,
        });

        console.log(
            `${chunks.length} chunks added to Chroma`
        );
    } catch (error) {
        console.error("Add document chunks error:", error);
        throw new Error("Failed to add document chunks to Chroma");
    }
};


/**
 * Search Chroma for relevant document chunks
 */
export const searchDocumentChunks = async (
    queryEmbedding: number[],
    documentId: string,
    topK: number = 5,
) => {
    try {
        const collection = await getDocumentCollection();

        const results = await collection.query({
            queryEmbeddings: [queryEmbedding],
            nResults: topK,
            where: {
                documentId,
            },
        });

        return results;
    } catch (error) {
        console.error("Chroma search error:", error);
        throw new Error("Failed to search document chunks");
    }
};


/**
 * Delete all chunks belonging to a document
 */
export const deleteDocumentChunks = async (
    documentId: string,
) => {
    try {
        const collection = await getDocumentCollection();

        await collection.delete({
            where: {
                documentId,
            },
        });

        console.log(
            `Chroma chunks deleted for document: ${documentId}`
        );
    } catch (error) {
        console.error("Delete Chroma chunks error:", error);
        throw new Error("Failed to delete document chunks");
    }
};