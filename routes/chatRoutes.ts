import express from "express";

import { protect } from "../middleware/validateToken";
import { chatWithAI, generateReport } from "../controllers/chatController";





const router=express.Router();

router.post("/message",chatWithAI);

router.post("/report",generateReport);

export default router;