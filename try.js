import path from 'path';
import dotenv from 'dotenv';

// Load .env file from the root directory
dotenv.config();

console.log('Environment:', process.env.NODE_ENV);
console.log('Database Config:', {
    host: process.env.DEV_DB_HOST,
    user: process.env.DEV_DB_USER,
    database: process.env.DEV_DB_NAME,
    password: process.env.DEV_DB_PASS
});