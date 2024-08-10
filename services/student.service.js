import * as studentModel from '../models/student.model.js';

export const getAllStudents = async() => {
    try {
        return await studentModel.getAllStudents();
    } catch (error) {
        throw new Error('Failed to fetch students: ' + error.message);
    }
};

export const getStudentById = async(id) => {
    try {
        const student = await studentModel.getStudentById(id);
        if (!student) {
            throw new Error('Student not found');
        }
        return student;
    } catch (error) {
        throw new Error('Failed to fetch student: ' + error.message);
    }
};

export const createStudentService = async(student) => {
    try {
        const result = await studentModel.createStudent(student);
        return result;
    } catch (error) {
        if (error.message === 'A student with this email already exists.') {
            throw new Error('A student with this email already exists. Please use a different email.');
        } else {
            throw new Error('Failed to create student: ' + error.message);
        }
    }
};

export const updateStudent = async(id, student) => {
    try {
        const updated = await studentModel.updateStudent(id, student);
        if (!updated) {
            throw new Error('Student not found or update failed');
        }
        return updated;
    } catch (error) {
        throw new Error('Failed to update student: ' + error.message);
    }
};

export const deleteStudent = async(id) => {
    try {
        const deleted = await studentModel.deleteStudent(id);
        if (!deleted) {
            throw new Error('Student not found or delete failed');
        }
        return deleted;
    } catch (error) {
        throw new Error('Failed to delete student: ' + error.message);
    }
};