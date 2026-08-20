import express from "express";
import { auth } from "../middlewares/auth.js";
import { deleteDocument, getDocumentById, getDocuments, uploadDocument } from "../controllers/document.Controllers.js";
import upload from "../middlewares/multer.js";

const router=express.Router()

router.post("/upload",auth,upload.single("file"),uploadDocument)
router.get("/get-docs",auth,getDocuments)
router.get("/get-doc/:id",auth,getDocumentById)
router.delete("/delete/:id",auth,deleteDocument)

export default router