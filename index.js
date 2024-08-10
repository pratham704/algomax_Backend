import express from "express";
// import dotenv from "dotenv";
import cors from "cors";
import studentRoutes from "./routes/student.routes.js";
import { getConnection } from "./config/database.js";
// dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Use the routes with a versioned prefix
app.use("/api/v1/students", studentRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the School CRUD API');
});

// Start the server
const port = process.env.NODE_ENV === 'production' ?
    process.env.PROD_PORT :
    process.env.NODE_ENV === 'test' ?
    process.env.TEST_PORT :
    process.env.DEV_PORT;


const setupDatabase = async() => {
    try {
        const connection = await getConnection(); // Establish the connection
        console.log('Database connection established.');
        connection.end(); // Close the connection
    } catch (error) {
        console.error('Error during database setup:', error.message);
    }
};

setupDatabase();

app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
});