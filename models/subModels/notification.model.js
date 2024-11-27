import { getConnection } from '../../config/database.js';

class NotificationModel {
    static async createTable() {
        const connection = await getConnection();
        const query = `
      CREATE TABLE IF NOT EXISTS notifications (
        id CHAR(36) PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        event_id CHAR(36),
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE SET NULL
      );
    `;
        await connection.execute(query);
        console.log('Notifications table created.');
    }

    static async createNotification({ userId, eventId, message }) {
        const connection = await getConnection();
        const query = `
      INSERT INTO notifications (id, user_id, event_id, message)
      VALUES (UUID(), ?, ?, ?);
    `;
        await connection.execute(query, [userId, eventId, message]);
    }

}

export default NotificationModel;