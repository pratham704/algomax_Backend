import express from "express";
import * as studentController from "../controllers/student.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a new student
router.post("/", studentController.createStudent);

router.use(authenticate); // from below to access any endpoint you need to have bearer 

// Get all students
router.get("/", studentController.getAllStudents);

// Get a student by ID
router.get("/:id", studentController.getStudentById);



// Update an existing student by ID
router.put("/:id", studentController.updateStudent);

// Delete a student by ID
router.delete("/:id", studentController.deleteStudent);

export default router;