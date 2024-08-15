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

const pool = mysql.createPool(DB_CONFIG);

export const getConnection = async() => {
    try {


        const connection = await pool.getConnection();

        // console.log(`Connection ID: ${connection.threadId}`);

        return connection;
    } catch (error) {
        console.error("Error getting connection from pool:", error.message);
        throw error;
    }
};