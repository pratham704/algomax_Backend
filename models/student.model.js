import { getConnection } from '../config/database.js';

export const createStudentTable = async() => {
    const connection = await getConnection();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                dateOfBirth DATE NOT NULL,
                gender ENUM('Male', 'Female', 'Other') NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `;
        const [result] = await connection.execute(query);

        if (result.warningStatus === 0) {
            console.log('Student table created now.');
        } else {
            console.log('Student table already exists.');
        }
    } catch (error) {
        console.error('Error creating student table:', error.message);
    } finally {
        connection.end();
    }
};



export const getAllStudents = async() => {
    const connection = await getConnection();
    try {
        const [rows] = await connection.execute('SELECT * FROM students');
        return rows;
    } catch (error) {
        throw new Error('Failed to fetch students: ' + error.message);
    } finally {
        connection.end();
    }
};

// Function to get a student by ID
export const getStudentById = async(id) => {
    const connection = await getConnection();
    try {
        const [rows] = await connection.execute('SELECT * FROM students WHERE id = ?', [id]);
        return rows[0]; // Return the first row (student)
    } catch (error) {
        throw new Error('Failed to fetch student: ' + error.message);
    } finally {
        connection.end();
    }
};

// Function to create a new student
export const createStudent = async(student) => {
    const connection = await getConnection();
    try {
        const { firstName, lastName, email, dateOfBirth, gender } = student;
        const [result] = await connection.execute(
            'INSERT INTO students (firstName, lastName, email, dateOfBirth, gender) VALUES (?, ?, ?, ?, ?)', [firstName, lastName, email, dateOfBirth, gender]
        );
        return { id: result.insertId, ...student }; // Return the created student with ID
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('A student with this email already exists.');
        } else {
            throw new Error('Failed to create student: ' + error.message);
        }
    } finally {
        connection.end();
    }
};

// Function to update an existing student
export const updateStudent = async(id, student) => {
    const connection = await getConnection();
    try {
        const { firstName, lastName, email, dateOfBirth, gender } = student;
        const [result] = await connection.execute(
            'UPDATE students SET firstName = ?, lastName = ?, email = ?, dateOfBirth = ?, gender = ? WHERE id = ?', [firstName, lastName, email, dateOfBirth, gender, id]
        );
        return result.affectedRows > 0; // Return true if any row was affected
    } catch (error) {
        throw new Error('Failed to update student: ' + error.message);
    } finally {
        connection.end();
    }
};

// Function to delete a student
export const deleteStudent = async(id) => {
    const connection = await getConnection();
    try {
        const [result] = await connection.execute('DELETE FROM students WHERE id = ?', [id]);
        return result.affectedRows > 0; // Return true if any row was affected
    } catch (error) {
        throw new Error('Failed to delete student: ' + error.message);
    } finally {
        connection.end();
    }
};