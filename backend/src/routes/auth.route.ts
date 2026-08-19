import express from "express";
import { googleCallback, googleLogin, register } from "../controllers/authcontrollers.js";

const router=express.Router()

router.post("/register",register)
router.post("/login",register)

router.post("/google",googleLogin)
router.post("google-callback",googleCallback)

export default router