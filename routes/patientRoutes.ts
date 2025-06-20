import express from "express";

import { getAllPatients, getPatientsProfile, loginPatient, registerPatient,  updatePatientProfile } from "../controllers/patientController";
import {protect, } from "../middleware/validateToken";





const router=express.Router();

router.post("/register",registerPatient);

router.post("/login",loginPatient);

router.get("/all",protect,getAllPatients);

router.get("/id",protect,getPatientsProfile);

router.put("/update",protect,updatePatientProfile);

//router.post("/reports",protect,submitChatHistory);

//router.post("/send-report",protect,sendReportToDoctor);

export default router;