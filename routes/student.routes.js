import express from "express";
import * as studentController from "../controllers/student.controller.js";
import * as authStudent from "../controllers/auth/auth.student.controller.js"
import { authenticate } from "../middlewares/auth.middleware.js";
import * as validate from "../middlewares/validate.middleware.js";

const router = express.Router();

// Create a new student
router.post("/", validate.validateStudentCreation, authStudent.createStudent);


router.post("/login", validate.validateStudentLogin, authStudent.loginStudent);

// router.use(authenticate); // from below to access any endpoint you need to have bearer or else write authenticate for every 

// Get all students
router.get("/", authenticate, studentController.getAllStudents);

// Get a student by ID
router.get("/:id", authenticate, studentController.getStudentById);

// Update an existing student by ID
router.put("/:id", authenticate, studentController.updateStudent);

// Delete a student by ID
router.delete("/:id", authenticate, studentController.deleteStudent);

export default router;