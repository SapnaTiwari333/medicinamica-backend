import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import prisma from "../config/prisma";

// @desc    Register a new doctor
// @route   POST /api/doctors/register
// @access  Public
export const registerDoctor = expressAsyncHandler(async (req: Request, res: Response) => {
  const { name, email, inviteCode } = req.body;

  const existingDoctor = await prisma.doctor.findUnique({ where: { email } }); // ✅ fixed this line

  if (existingDoctor) {
    res.status(400);
    throw new Error("Doctor already exists");
  }

  const doctor = await prisma.doctor.create({
    data: {
      name,
      email,
      inviteCode,
    },
  });

  res.status(201).json({ doctor });
});

// @desc    Get patients of a doctor
// @route   GET /api/doctors/:doctorId/patients
// @access  Private
export const getDoctorPatients = expressAsyncHandler(async (req: Request, res: Response) => {
  const { doctorId } = req.params;

  const doctor = await prisma.doctor.findUnique({
    where: { id: Number(doctorId) },
    include: {
      patients: true,
    },
  });

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  res.status(200).json({ patients: doctor.patients });
});
