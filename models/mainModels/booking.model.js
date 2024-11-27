import { getConnection } from '../../config/database.js';

class BookingModel {
    static async createTable() {
        const connection = await getConnection();
        const query = `
      CREATE TABLE IF NOT EXISTS bookings (
        id CHAR(36) PRIMARY KEY,
        event_id CHAR(36) NOT NULL,
        user_id CHAR(36) NOT NULL,
        tickets_booked INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(firebaseUid) ON DELETE CASCADE
      );
    `;
        await connection.execute(query);
        console.log('Bookings table created.');
    }

    static async createBooking({ eventId, userId, ticketsBooked }) {
        const connection = await getConnection();
        const query = `
      INSERT INTO bookings (id, event_id, user_id, tickets_booked)
      VALUES (UUID(), ?, ?, ?);
    `;
        await connection.execute(query, [eventId, userId, ticketsBooked]);
    }

    static async getBookingsByUser(userId) {
        const connection = await getConnection();
        const query = `SELECT * FROM bookings WHERE user_id = ?;`;
        const [rows] = await connection.execute(query, [userId]);
        return rows;
    }
}

export default BookingModel;