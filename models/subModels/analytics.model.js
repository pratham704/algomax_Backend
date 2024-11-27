import { getConnection } from '../../config/database.js';

class AnalyticsModel {
    static async createTable() {
        const connection = await getConnection();
        const query = `
      CREATE TABLE IF NOT EXISTS analytics (
        id CHAR(36) PRIMARY KEY,
        event_id CHAR(36) NOT NULL,
        tickets_sold INT DEFAULT 0,
        revenue_generated DECIMAL(10, 2) DEFAULT 0.00,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
      );
    `;
        await connection.execute(query);
        console.log('Analytics table created.');
    }

    static async updateAnalytics({ eventId, ticketsSold, revenueGenerated }) {
        const connection = await getConnection();
        const query = `
      INSERT INTO analytics (id, event_id, tickets_sold, revenue_generated)
      VALUES (UUID(), ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        tickets_sold = tickets_sold + VALUES(tickets_sold),
        revenue_generated = revenue_generated + VALUES(revenue_generated),
        updated_at = CURRENT_TIMESTAMP;
    `;
        await connection.execute(query, [eventId, ticketsSold, revenueGenerated]);
    }

    static async getAnalytics(eventId) {
        const connection = await getConnection();
        const query = `SELECT * FROM analytics WHERE event_id = ?;`;
        const [rows] = await connection.execute(query, [eventId]);
        return rows[0];
    }
}

export default AnalyticsModel;