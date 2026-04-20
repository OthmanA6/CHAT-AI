import { Router } from "express";
import { handleGenerate, handleGenerateImage } from "../controllers/ai.controller.js";

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

const router = Router();


router.post("/generate", handleGenerate);
router.post("/generate-image", handleGenerateImage);
router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.status(200).json({ fileUrl, filename: req.file.originalname, mimetype: req.file.mimetype });
});

export default router;
