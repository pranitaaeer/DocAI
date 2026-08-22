import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME?.trim(),
  api_key: process.env.API_KEY?.trim(),
  api_secret: process.env.API_SECRET?.trim(),
});

console.log("cloudname:",process.env.CLOUD_NAME,process.env.API_KEY,process.env.API_SECRET)

export const uploadToCloudinary = async (file: Express.Multer.File): Promise<UploadApiResponse | null> => {
  try {
    if (!file || !file.buffer) return null;

    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;

    const result: UploadApiResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "DocAI_Avatar",
      resource_type: "auto",
    });
     
    if (!result) {
      throw new Error("error to upload image to cloudinary");
    }
    
    return result;
  } catch (error: any) {
    console.log("err,", error);
    throw new Error("error to upload image to cloudinary");
  }
};

export const deleteFromCloudinary=async(publicId:string)=>{
  if(!publicId) return null
   await cloudinary.uploader.destroy(publicId,(err,result)=>{
    if(err) {
      throw new Error("error to delete image from cloudinary")
    }
    return result
   })
}