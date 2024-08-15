import mysql from "mysql2/promise";
import config from "../config/config.js";

const DB_CONFIG = {
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

// Create a connection pool
const pool = mysql.createPool(DB_CONFIG);

let connectionCount = 0;

export const getConnection = async() => {
    try {
        console.log("Called getConnection");

        connectionCount++;
        console.log(`Connection established count: ${connectionCount}`);

        const connection = await pool.getConnection();

        console.log(`Connection ID: ${connection.threadId}`);

        return connection;
    } catch (error) {
        console.error("Error getting connection from pool:", error.message);
        throw error;
    }
};