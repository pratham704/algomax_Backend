import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import studentRoutes from "./routes/student.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(helmet());

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS || '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
app.use(limiter);


app.use("/api/v1/students", studentRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the School CRUD API');
});

// Start the server
const port = process.env.NODE_ENV === 'production' ?
    process.env.PROD_PORT :
    process.env.NODE_ENV === 'test' ?
    process.env.TEST_PORT :
    process.env.DEV_PORT;



app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
});