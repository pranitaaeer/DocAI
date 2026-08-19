import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import UserModel from "../models/user.models.js";


export const auth=async(req:Request,res:Response,next: NextFunction)=>{
 try {
    let token = req.cookies.token;
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      
      // Standard format: "Bearer <token>"
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      } else {
        token = authHeader; 
      }
    }
    console.log("TOKEN:", token)
    if (!token) {
      return res.status(400).json({ msg: "No token in auth !" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    if (!decodedToken) {
      return res
        .status(400)
        .json({ msg: "Error while decoding token in auth !" });
    }
     const user = await UserModel.findById(decodedToken.userId)
        console.log("user",user)
        console.log("user",decodedToken.userId)
        
     if (!user) {
      return res.status(400).json({ msg: "No user found !" });
    }
    req.user = user;
    next();
 } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({ msg: "Internal server error" });
 }
}