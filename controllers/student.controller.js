import * as studentService from "../services/student.service.js";
import * as authStudentService from "../services/auth.service/auth.service.student.js";
import { success_response, fail_response } from "../utils/responses/responses.js";
export const createStudent = async(req, res) => {
    const student = req.body;

    try {
        const { status_code, obj } = await authStudentService.createStudentService(student);
        success_response(res, status_code, obj)
            // res.status(status_code).json(obj);
    } catch (error) {
        console.log(error.message, "development error") //  gives me actual error in the db 
        fail_response(res, error.error_status_code, error.error_message)
            // res.status(error.error_status_code).json({ "message": error.error_message })

    }
};

export const loginStudent = async(req, res) => {
    const student = req.body;

    try {
        const { status_code, obj } = await authStudentService.loginStudentService(
            student
        );
        success_response(res, status_code, obj)

        // res.status(status_code).json(obj);
    } catch (error) {
        console.log(error.message, "development error")
        fail_response(res, error.error_status_code, error.error_message)

        // res.status(error.error_status_code).json({ "message": error.error_message })

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