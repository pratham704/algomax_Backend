import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
// import studentRoutes from "./routes/student.routes.js";
import basicRoutes from "./Api-Basic/routes/basic.routes.js"
import authRoutes from "./routes/auth.routes.js"
import organizerRoutes from "./routes/organizer.routes.js"

dotenv.config();

const app = express();
app.use(express.json());

app.use(helmet());

// app.use(cors({
//     origin: process.env.ALLOWED_ORIGINS || '*',
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
app.use(limiter);

// for basic routes 

app.use("/api/v1/basic", basicRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/organizer", organizerRoutes);

// for mysql comment  only if u add .env in the hosting provider .. or else uncomment it 
// app.use("/api/v1/students", studentRoutes);


const port = process.env.NODE_ENV === 'production' ?
    process.env.PROD_PORT :
    process.env.NODE_ENV === 'test' ?
    process.env.TEST_PORT :
    process.env.DEV_PORT;


app.get('/', (req, res) => {
    res.send(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
});


app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
});