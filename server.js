import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import studentRoutes from "./routes/student.routes.js";
import cluster from "cluster";
import os from "os";
import compression from "compression";

dotenv.config();

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Master process is running with PID: ${process.pid}`);
    console.log(`Forking ${numCPUs} workers...`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker with PID: ${worker.process.pid} died. Forking a new worker...`);
        cluster.fork();
    });
} else {
    const app = express();
    app.use(express.json());

    app.use(helmet());

    app.use(cors({
        origin: process.env.ALLOWED_ORIGINS || '*',
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));

    app.use(compression());

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100
    });
    app.use(limiter);

    app.use("/api/v1/students", studentRoutes);

    app.get('/', (req, res) => {
        res.send('CRUD API');
    });

    const port = process.env.NODE_ENV === 'production' ?
        process.env.PROD_PORT :
        process.env.NODE_ENV === 'test' ?
        process.env.TEST_PORT :
        process.env.DEV_PORT;

    app.listen(port, () => {
        console.log(`Worker with PID: ${process.pid} is running in ${process.env.NODE_ENV} mode on port ${port}`);
    });

    process.on('SIGTERM', () => {
        console.log('SIGTERM signal received. Closing HTTP server...');
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(0);
        });
    });
}