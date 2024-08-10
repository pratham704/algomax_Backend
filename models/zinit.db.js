import { createStudentTable } from './student.model.js';
import { getConnection } from '../config/database.js'; // Adjust the path if needed
import dotenv from 'dotenv';

dotenv.config();

const setupDatabase = async() => {
    try {
        const connection = await getConnection(); // Establish the connection
        await createStudentTable(); // Create the table
        console.log('Database setup completed.');
        connection.end(); // Close the connection
    } catch (error) {
        console.error('Error during database setup:', error.message);
    }
};

setupDatabase();