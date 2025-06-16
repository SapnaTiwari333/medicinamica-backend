import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @desc    Register patient
// @route   POST /api/patients/register
// @access  Public
export const registerPatient = expressAsyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, allergies, diseases, medications} = req.body;

  // // Validate input fields
  if (!name || !email || !password || !allergies || !diseases || !medications ) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }


  // Check if patient already exists by email
  const existingPatient = await prisma.patient.findUnique({ where: { email } });

  if (existingPatient) {
    res.status(400);
    throw new Error("Patient already registered");
  }


  // // Hash the password securely before storing
  const hashedPassword = await bcrypt.hash(password, 10);


  // Create new patient record
  const patient = await prisma.patient.create({
    data: {
      name,
      email,
      password: hashedPassword,
      allergies,
      diseases,
      medications,
      //doctorId,
    },
  });

  res.status(201).json({ message: "Patient registered successfully", patient });
});

// @desc    Login patient
// @route   POST /api/patients/login
// @access  Public
export const loginPatient = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;


  //// Validate input
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  //// Check if patient exists
  const patient = await prisma.patient.findUnique({
    where: { email },
  });

  // Ensure patient exists and password is not null
  if (!patient || !patient.password) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, patient.password);

  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

// Generate JWT token
  const token = jwt.sign(
    {
      user: {
        id: patient.id,
        email: patient.email,
        name: patient.name,
      },
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    patient,
  });
});

// @desc    Get all patients
// @route   GET /api/patients/allprofile
// @access  Private
export const getAllPatients = expressAsyncHandler(async (_req: Request, res: Response) => {
  const patients = await prisma.patient.findMany();
  res.status(200).json({ patients });
});

// @desc    Get patient profile by email
// @route   GET /api/patients/:email
// @access  Private
export const getPatientsProfile = expressAsyncHandler(async (req: Request, res: Response) => {
  const email = req.params.email;

  const patient = await prisma.patient.findUnique({ where: { email } });

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  res.status(200).json({ patient });
});

// @desc    Update patient profile
// @route   PUT /api/patients/update
// @access  Private
export const updatePatientProfile = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, name, allergies, diseases, medications, doctorId } = req.body;

  const updatedPatient = await prisma.patient.update({
    where: { email },
    data: {
      name,
      allergies,
      diseases,
      medications,
     
    },
  });

  res.status(200).json({ message: "Profile updated", patient: updatedPatient });
});

// @desc    Submit chatbot history report
// @route   POST /api/chat/reports
// @access  Private
/*export const submitChatHistory = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, reportContent } = req.body;

  const patient = await prisma.patient.findUnique({ where: { email } });

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  const report = await prisma.chatReport.create({
    data: {
      content: reportContent,
      patientId: patient.id,
    },
  });

  res.status(201).json({ message: "Report submitted", report });
});

// @desc    Send report to doctor
// @route   POST /api/chat/send-report
// @access  Private
export const sendReportToDoctor = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, doctorId, reportContent } = req.body;

  const patient = await prisma.patient.findUnique({ where: { email } });

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  const message = await prisma.doctorMessage.create({
    data: {
      doctorId,
      patientId: patient.id,
      content: reportContent,
    },
  });

  res.status(201).json({ message: "Report sent to doctor",  });
});*/
