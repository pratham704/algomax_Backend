import { getConnection } from "../config/database.js";
import * as pass from "../utils/password/bcrypt.password.js";
import * as jwtFunction from "../utils/auth/jwt.utils.js";
import { v4 as uuidv4 } from "uuid";

export const createStudentTable = async() => {
    const connection = await getConnection();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS students (
                id VARCHAR(36) PRIMARY KEY, 
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                dateOfBirth DATE NOT NULL,
                gender ENUM('Male', 'Female', 'Other') NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `;

        const [result] = await connection.execute(query);

        if (result.warningStatus === 0) {
            console.log("Student table created or updated.");
        } else {
            console.log("Student table already exists.");
        }
    } catch (error) {
        console.error("Error creating student table:", error.message);
    } finally {
        connection.end();
    }
};

// Get all students
export const getAllStudents = async() => {
    const connection = await getConnection();
    try {
        const [rows] = await connection.execute("SELECT * FROM students");
        return rows;
    } catch (error) {
        throw new Error("Failed to fetch students: " + error.message);
    } finally {
        connection.end();
    }
};

// Get a student by ID
export const getStudentById = async(id) => {
    const connection = await getConnection();
    try {
        const [rows] = await connection.execute(
            "SELECT * FROM students WHERE id = ?", [id]
        );
        return rows[0]; // Return the first row (student)
    } catch (error) {
        throw new Error("Failed to fetch student: " + error.message);
    } finally {
        connection.end();
    }
};

export const createStudentService = async(student) => {
    const connection = await getConnection();
    try {
        const { firstName, lastName, email, dateOfBirth, gender, password } =
        student;
        const hashedPassword = await pass.encryptPassword(password);
        const studentId = uuidv4();
        const [result] = await connection.execute(
            "INSERT INTO students (id, firstName, lastName, email, dateOfBirth, gender, password) VALUES (?, ?, ?, ?, ?, ?, ?)", [
                studentId,
                firstName,
                lastName,
                email,
                dateOfBirth,
                gender,
                hashedPassword,
            ]
        );

        const token = jwtFunction.generateToken({ id: studentId, email, firstName });
        return { id: studentId, firstName, lastName, email, token };
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            throw new Error("A student with this email already exists.");
        } else {
            throw new Error("Failed to create student: " + error.message);
        }
    } finally {
        connection.end();
    }
};

// Update an existing student
export const updateStudent = async(id, student) => {
    const connection = await getConnection();
    try {
        const { firstName, lastName, email, dateOfBirth, gender } = student;
        const [result] = await connection.execute(
            "UPDATE students SET firstName = ?, lastName = ?, email = ?, dateOfBirth = ?, gender = ? WHERE id = ?", [firstName, lastName, email, dateOfBirth, gender, id]
        );
        return result.affectedRows > 0; // Return true if any row was affected
    } catch (error) {
        throw new Error("Failed to update student: " + error.message);
    } finally {
        connection.end();
    }
};

// Delete a student
export const deleteStudent = async(id) => {
    const connection = await getConnection();
    try {
        const [result] = await connection.execute(
            "DELETE FROM students WHERE id = ?", [id]
        );
        return result.affectedRows > 0; // Return true if any row was affected
    } catch (error) {
        throw new Error("Failed to delete student: " + error.message);
    } finally {
        connection.end();
    }
};