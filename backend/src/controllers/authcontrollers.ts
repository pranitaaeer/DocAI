import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import {
  getGoogleAuthUrl,
  getGoogleUser,
} from "../services/auth/googleAuthService.js";

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if([name,email,password].some((elm)=>!elm)){
        res.status(404).json({
        message: "all fields are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({
        message: "User already exists",
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create JWT
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      secret,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const googleLogin = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const url = getGoogleAuthUrl();

    res.redirect(url);
  } catch (error) {
    console.error("Google login error:", error);

    res.status(500).json({
      message: "Unable to start Google login",
    });
  }
};

export const googleCallback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { code } = req.query;

    if (!code || typeof code !== "string") {
      res.status(400).json({
        message: "Google authorization code is missing",
      });
      return;
    }

    const googleUser = await getGoogleUser(code);

    let user = await User.findOne({
      email: googleUser.email,
    });

    // Existing user
    if (user) {
      if (!user.googleId) {
        user.googleId = googleUser.googleId;
      }

      if (googleUser.picture) {
        user.avatar = googleUser.picture;
      }

      await user.save();
    }

    // New user
    if (!user) {
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        googleId: googleUser.googleId,
        avatar: googleUser.picture,
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      secret,
      {
        expiresIn: "7d",
      }
    );

    // Temporary: return token while testing
    res.json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Google callback error:", error);

    res.status(500).json({
      message: "Google authentication failed",
    });
  }
};