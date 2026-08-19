import express from "express";
import { googleCallback, googleLogin, register ,login} from "../controllers/auth.controllers.js";

const router=express.Router()

router.post("/register",register)
router.post("/login",login)

router.post("/google",googleLogin)
router.post("google-callback",googleCallback)

export default router