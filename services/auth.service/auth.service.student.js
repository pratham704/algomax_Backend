import { getConnection } from "../../config/database.js";
import * as pass from "../../utils/password/bcrypt.password.js";
import * as jwtFunction from "../../utils/auth/jwt.utils.js";
import { v4 as uuidv4 } from "uuid";

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


export const loginStudentService = async(info) => {
    const connection = await getConnection();
    const email = info.email
    try {
        const [rows] = await connection.execute(
            'SELECT id, firstName, lastName, email, password FROM students WHERE email = ?', [email]
        );

        console.log(rows)

        if (rows.length === 0) {
            throw new Error('No student found with this email.');
        }

        const student = rows[0];
        const isPasswordValid = await pass.isPasswordCorrect(info.password, student.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password.');
        }
        const token = jwtFunction.generateToken({
            id: student.id,
            email: student.email,
            firstName: student.firstName
        });

        return {
            id: student.id,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            token
        };
    } catch (error) {
        throw new Error('Failed to login: ' + error.message);
    } finally {
        connection.end();
    }
};