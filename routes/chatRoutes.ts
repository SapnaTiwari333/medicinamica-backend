import express from "express";


import { chatWithAI, } from "../controllers/chatController";
//import { protect } from "../middleware/validateToken";





const router=express.Router();

router.post("/message",chatWithAI);

//router.post("/report",generateReport);

export default router;