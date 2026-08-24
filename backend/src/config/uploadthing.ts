import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const uploadToUploadThing = async (
  file: Express.Multer.File
) => {
  try {
    if (!file?.buffer) {
      return null;
    }

    // Convert Multer Buffer → Uint8Array
    const uint8Array = new Uint8Array(file.buffer);

    // Convert Uint8Array → File
    const uploadFile = new File(
      [uint8Array],
      file.originalname,
      {
        type: file.mimetype,
      }
    );

    const result = await utapi.uploadFiles(uploadFile);

    console.log("UploadThing upload response:", result);

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result;
  } catch (error) {
    console.error("UploadThing upload error:", error);
    throw new Error("Error uploading file to UploadThing");
  }
};

export const deleteFromUploadThing = async (fileKey: string) => {
  try {
    if (!fileKey) {
      return null;
    }

    const result = await utapi.deleteFiles(fileKey);

    console.log("UploadThing delete response:", result);

    return result;
  } catch (error) {
    console.error("UploadThing delete error:", error);
    throw new Error("Error deleting file from UploadThing");
  }
};