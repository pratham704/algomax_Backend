import { getConnection } from "../../config/database.js";
import * as pass from "../../utils/auth/bcrypt.password.js";
import * as jwtFunction from "../../utils/auth/jwt.utils.js";
import { v4 as uuidv4 } from "uuid";
import { mysqlErrorMap } from "../../utils/responses/mysql.ErrorMap.js";

export const createStudentService = async(student) => {
    const connection = await getConnection();
    try {
        const { firstName, lastName, email, dateOfBirth, gender, password } = student;
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

        const token = jwtFunction.generateToken({
            id: studentId,
            email,
            firstName,
        });

        const obj = {
            id: studentId,
            firstName,
            lastName,
            email,
            token,
        };

        let status_code = 201;
        return { status_code, obj };
    } catch (error) {
        if (!error.error_status_code && !error.error_message) {
            console.log(error.message);
            if (mysqlErrorMap[error.code]) {
                const { status, message } = mysqlErrorMap[error.code];
                error.error_status_code = status;
                error.error_message = message;
            } else {
                error.error_status_code = 500;
                error.error_message = "Something went wrong.";
            }
        }

        throw error;
    } finally {
        connection.end();
    }
};


export const loginStudentService = async(info) => {
    const connection = await getConnection();
    const email = info.email;
    try {
        const [rows] = await connection.execute(
            "SELECT id, firstName, lastName, email, password FROM students WHERE email = ?", [email]
        );

        console.log(rows);

        if (rows.length === 0) {
            const error = new Error("No student found with this email.");
            error.error_status_code = 404;
            error.error_message = "Student not found";
            throw error;
        }

        const student = rows[0];
        const isPasswordValid = await pass.isPasswordCorrect(
            info.password,
            student.password
        );

        if (!isPasswordValid) {
            const error = new Error("Invalid password.");
            error.error_status_code = 401;
            error.error_message = "Invalid password";
            throw error;
        }
        const token = jwtFunction.generateToken({
            id: student.id,
            email: student.email,
            firstName: student.firstName,
        });

        const obj = {
            id: student.id,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            token,
        };

        let status_code = 200;
        return { status_code, obj };
    } catch (error) {
        if (!error.error_status_code && !error.error_message) {
            console.log(error.message);
            if (mysqlErrorMap[error.code]) {
                const { status, message } = mysqlErrorMap[error.code];
                error.error_status_code = status;
                error.error_message = message;
            } else {
                error.error_status_code = 500;
                error.error_message = "Something went wrong.";
            }
        }

        throw error;
    } finally {
        connection.end();
    }
};