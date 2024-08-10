import mysql from "mysql2/promise";
import config from "../config/config.js"; // Adjust the path if needed

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

export const getConnection = async() => {
    try {
        // console.log(
        //     "Attempting to connect to the database with config:",
        //     DB_CONFIG
        // );
        const connection = await mysql.createConnection(DB_CONFIG);
        return connection;
    } catch (error) {
        console.error("Error establishing database connection:", error.message);
        throw error;
    }
};

getConnection();