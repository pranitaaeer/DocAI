import express from "express";
import { auth } from "../middlewares/auth.js";
import { createChat, deleteChat, getChatById, getChats, sendMessage } from "../controllers/chat.controllers.js";

const router=express.Router()

router.post("/create",auth,createChat)
router.get("/getchats",auth,getChats)
router.get("/get-chat/:id",auth,getChatById)
router.post("/send-msg/:id",auth,sendMessage)

router.delete("/delete/:id",auth,deleteChat)

export default router