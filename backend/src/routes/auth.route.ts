import express from "express";
import { googleCallback, googleLogin, register ,login, logout, myinfo} from "../controllers/auth.controllers.js";
import { auth } from "../middlewares/auth.js";

const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",auth,logout)
router.get("/me",auth,myinfo)

router.post("/google",googleLogin)
router.post("/google-callback",googleCallback)

export default router