import mysql from "mysql2/promise";
import config from "../config/config.js";

const DB_CONFIG = {
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
    port: 3306,
    connectTimeout: 10000
};

export const getConnection = async() => {
    const maxRetries = 3;
    const retryDelay = 1000;
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Create a new connection each time
            const connection = await mysql.createConnection(DB_CONFIG);

            // Add connection error handler
            connection.on('error', (err) => {
                console.error('Connection error', err);
                connection.destroy(); // Immediately destroy connection on error
            });

            return connection;
        } catch (error) {
            lastError = error;
            console.error(`Connection attempt ${attempt} failed:`, error.message);

            if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
                continue;
            }

            throw error;
        }
    }

    throw new Error(`Failed to get connection after ${maxRetries} attempts. Last error: ${lastError.message}`);
};

export const releaseConnection = async(connection) => {
    try {
        if (connection) {
            await connection.end();
        }
    } catch (error) {
        console.error("Error closing connection:", error.message);
        throw error;
    }
};

export const endPool = async() => {
    // This function is kept for backwards compatibility
    // but does nothing since we're not using a pool anymore
    return Promise.resolve();
};