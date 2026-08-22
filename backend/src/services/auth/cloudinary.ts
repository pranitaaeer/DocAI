import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadToCloudinary=async(file:Express.Multer.File)=>{
  if(!file || !file.path ) return null
    
    const result:UploadApiResponse= await cloudinary.uploader.upload(file.path,{
      folder:"DocAI_Avatar",
      resource_type:"auto"
    })
     
    if(!result){
     throw new Error("error to upload image to cloudinary")
    }
    return result
}

export const deleteFromCloudinary=async(publicId:string)=>{
  if(!publicId) return null
   await cloudinary.uploader.destroy(publicId,(err,result)=>{
    if(err) {
      throw new Error("error to delete image from cloudinary")
    }
    return result
   })
}