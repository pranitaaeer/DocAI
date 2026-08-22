import { Request, response, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import {
    getGoogleAuthUrl,
    getGoogleUser,
} from "../services/auth/googleAuthService.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../services/auth/cloudinary.js";

export const register = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if ([name, email, password].some((elm) => !elm)) {
            return res.status(404).json({
                message: "all fields are required",
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
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
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({
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

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).json({ message: "all fields are required" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(403).json({ message: "please login first" })
        }
        const isCorrectPass = await bcrypt.compare(password, user.password)
        if (!isCorrectPass) {
            return res.status(401).json({ message: "please Enter a valid password" })
        }
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
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "User login successfully",
            token,

        });

    } catch (error) {
        console.error(" login error:", error);

        return res.status(500).json({
            message: "Unable to login",
        });
    }
}

export const googleLogin = async (
    _req: Request,
    res: Response
) => {
    try {
        const url = getGoogleAuthUrl();

        res.redirect(url);
    } catch (error) {
        console.error("Google login error:", error);

        return res.status(500).json({
            message: "Unable to start Google login",
        });
    }
};

export const googleCallback = async (
    req: Request,
    res: Response
) => {
    try {
        const { code } = req.query;

        if (!code || typeof code !== "string") {
            return res.status(400).json({
                message: "Google authorization code is missing",
            });
        }

        // Get Google user
        const googleUser = await getGoogleUser(code);

        // Find existing user
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

        // JWT secret
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error(
                "JWT_SECRET is not defined"
            );
        }

        // Create JWT
        const token = jwt.sign(
            {
                userId: user._id,
            },
            secret,
            {
                expiresIn: "7d",
            }
        );

        // Save JWT in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge:
                7 * 24 * 60 * 60 * 1000,
        });

        // Redirect to frontend
        return res.redirect(
            `${process.env.FRONTEND_URL}/dashboard`
        );

    } catch (error) {
        console.error(
            "Google callback error:",
            error
        );

        return res.status(500).json({
            message: "Google authentication failed",
        });
    }
};

export const myinfo = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user?._id).select("-password");
        if (!user) {
            return res.status(403).json({ message: "unAuthorized User" })
        }
        return res.status(200).json({
            message: "user fetched successfully",
            user
        });
    } catch (error) {
        console.error(" fetch myinfo error:", error);

        return res.status(500).json({
            message: "internal server err",
        });
    }
}
export const changePassword = async (req: Request, res: Response) => {
    try {
        const { newPassword } = req.body
        const userId  = req.user?._id

        if (!newPassword) {
            return res.status(404).json({ message: "plz enter password" })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        if (!hashedPassword) {
            return res.status(400).json({ message: "err in password hashing" })
        }
        user.password = hashedPassword
        await user.save()

        return res.status(200).json({ message: "update password successfully" })

    } catch (error) {
        console.error("err in change password:", error);

        return res.status(500).json({
            message: "internal server err",
        });
    }
}
export const changeAvatar = async (req: Request, res: Response) => {
    try {
        const userId  = req.user?._id
        const avatar=req.file
        console.log("avatar:",avatar)

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        if (!avatar) {
            return res.status(400).json({ message: "No avatar file provided" });
        }

        if(user.public_id && avatar){
            let oldavatar=user.public_id
           const deleteres= await deleteFromCloudinary(oldavatar as string)
           console.log("delete avatar:",deleteres)
        }

        const response=await uploadToCloudinary(avatar as Express.Multer.File)
        console.log("cloudinary response: ",response)
        if(!response){
            return res.status(400).json({ message: "err to upload avatar" })
        }

        user.avatar=response.secure_url || user.avatar
        user.public_id=response.public_id || user.public_id
        await user.save()

        return res.status(200).json({ message: "update avatar successfully" })

    } catch (error) {
        console.error("err in change avatar:", error);

        return res.status(500).json({
            message: "internal server err",
        });
    }
}
export const logout = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user?.userId)
        if (!user) {
            return res.status(403).json({ message: "unAuthorized User" })
        }
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 0
        })
        return res.status(200).json({ message: "User logout successfully" })

    } catch (error) {
        console.error("myinfo callback error:", error);

        return res.status(500).json({
            message: "internal server err",
        });
    }
}