
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.models.js";

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    // First priority: Authorization header
    const authHeader = req.headers.authorization;

    if (authHeader) {
      token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;
    }

    // Fallback: Cookie
    if (!token) {
      token = req.cookies?.token;
    }

    if (!token) {
      return res.status(401).json({
        msg: "No token in auth!",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decodedToken = jwt.verify(token, secret) as {
      userId: string;
    };

    const user = await UserModel.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({
        msg: "No user found!",
      });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Auth error:", error);

    return res.status(401).json({
      msg: "Invalid or expired token",
    });
  }
};
