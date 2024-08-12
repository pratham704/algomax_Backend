import * as studentService from "../services/student.service.js";
import * as authStudentService from "../services/auth.service/auth.service.student.js";

export const createStudent = async(req, res) => {
    const student = req.body;

    try {
        const newStudent = await authStudentService.createStudentService(student);
        res.status(201).json(newStudent);
    } catch (error) {
        if (error.message.includes("already exists")) {
            res.status(409).json({ message: error.message });
        } else {
            res
                .status(500)
                .json({ message: "Internal server error: " + error.message });
        }
    }
};

export const loginStudent = async(req, res) => {
    const student = req.body;

    try {
        const loggedInStudent = await authStudentService.loginStudentService(
            student
        );
        res.status(200).json(loggedInStudent);
    } catch (error) {
        if (error.message.includes("already exists")) {
            res.status(409).json({ message: error.message }); // Conflict
        } else if (error.message.includes("Invalid credentials")) {
            res.status(401).json({ message: "Unauthorized: " + error.message }); // Unauthorized
        } else {
            res
                .status(500)
                .json({ message: "Internal server error: " + error.message });
        }
    }
};

// Get all students
export const getAllStudents = async(req, res) => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a student by ID
export const getStudentById = async(req, res) => {
    const { id } = req.params;
    try {
        const student = await studentService.getStudentById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing student
export const updateStudent = async(req, res) => {
    const { id } = req.params;
    const student = req.body;
    try {
        const updated = await studentService.updateStudent(id, student);
        if (!updated) {
            return res
                .status(404)
                .json({ message: "Student not found or update failed" });
        }
        res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a student
export const deleteStudent = async(req, res) => {
    const { id } = req.params;
    try {
        const deleted = await studentService.deleteStudent(id);
        if (!deleted) {
            return res
                .status(404)
                .json({ message: "Student not found or delete failed" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};