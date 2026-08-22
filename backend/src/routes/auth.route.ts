import express from "express";
import { googleCallback, googleLogin, register ,login, logout, myinfo, changePassword, changeAvatar} from "../controllers/auth.controllers.js";
import { auth } from "../middlewares/auth.js";
import { uploadImage } from "../middlewares/multer.js";

const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",auth,logout)
router.get("/me",auth,myinfo)
router.put("/change-pass",auth,changePassword)
router.put("/change-avatar",auth,uploadImage.single("avatar"),changeAvatar)


router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

export default router