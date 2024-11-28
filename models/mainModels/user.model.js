import { getConnection, endPool } from '../../config/database.js';


class UserModel {
    static async createTable() {
        const connection = await getConnection();

        try {
            const query = `
          CREATE TABLE IF NOT EXISTS users (
            id CHAR(36) PRIMARY KEY,
            firebaseUid VARCHAR(255) NOT NULL UNIQUE,
            name VARCHAR(100),
            email VARCHAR(255) UNIQUE,
            role ENUM('user', 'organizer', 'admin') DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
            await connection.execute(query);
            console.log('Users table created.');

        } catch (error) {

            console.log('Error creating users table:', error);

        } finally {
            await endPool();
        }

    }

    static async createUser({ firebaseUid, name, email, role }) {
        const connection = await getConnection();

        const query = `
      INSERT INTO users (id, firebaseUid, name, email, role) 
      VALUES (UUID(), ?, ?, ?, ?);
    `;
        await connection.execute(query, [firebaseUid, name, email, role]);
    }

}

export default UserModel;