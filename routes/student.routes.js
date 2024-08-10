import express from "express";
import * as studentController from "../controllers/student.controller.js";

const router = express.Router();

// Get all students
router.get("/", studentController.getAllStudents);

// Get a student by ID
router.get("/:id", studentController.getStudentById);

// Create a new student
router.post("/", studentController.createStudent);

// Update an existing student by ID
router.put("/:id", studentController.updateStudent);

// Delete a student by ID
router.delete("/:id", studentController.deleteStudent);

export default router;