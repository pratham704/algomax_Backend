import { getConnection } from '../config/database.js';

// Create the teachers table if it doesn't exist
export const createTeacherTable = async() => {
    const connection = await getConnection();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS teachers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                subject VARCHAR(255) NOT NULL,
                dateOfJoining DATE NOT NULL,
                gender ENUM('Male', 'Female', 'Other') NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `;
        await connection.execute(query);
        console.log('Teacher table created or already exists.');
    } catch (error) {
        console.error('Error creating teacher table:', error.message);
    } finally {
        connection.end();
    }
};