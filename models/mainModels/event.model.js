import { getConnection, releaseConnection } from '../../config/database.js';


class EventModel {
    static async createTable() {
        const connection = await getConnection();
        const query = `
      CREATE TABLE IF NOT EXISTS events (
        id CHAR(36) PRIMARY KEY,
        organizer_id CHAR(36) NOT NULL,
        title VARCHAR(200),
        description TEXT,
        location VARCHAR(255),
        image VARCHAR(255),
        date DATE,
        time TIME,
        category VARCHAR(100),
        ticket_price DECIMAL(10, 2),
        c INT,
        available_tickets INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (organizer_id) REFERENCES users(firebaseUid) ON DELETE CASCADE
      );
    `;
        await connection.execute(query);
        console.log('Events table created.');
    }


    static async createEvent({ firebaseUid, title, description, location, image, date, time, category, ticketPrice, totalTickets }) {
        let connection;
        try {

            const connection = await getConnection();
            // first create the table if not exists
            await this.createTable();
            const query = `
          INSERT INTO events (id, organizer_id, title, description, location, image, date, time, category, ticket_price, total_tickets, available_tickets)
          VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
           `;
            const [result] = await connection.execute(query, [firebaseUid, title, description, location, image, date, time, category, ticketPrice, totalTickets, totalTickets]);

            return "created successfully";

        } catch (error) {

            throw error;

        } finally {
            if (connection) await releaseConnection(connection);

        }
    }

    static async getEvents(firebaseUid) {
        let connection;
        try {
            connection = await getConnection();
            const query = `SELECT * FROM events WHERE organizer_id = ?`;
            const [result] = await connection.execute(query, [firebaseUid]);
            console.log(result);
            return result;
        } catch (error) {
            throw error;
        } finally {
            if (connection) await releaseConnection(connection);
        }
    }


    static async getSingleEvent(firebaseUid, eventId) {
        let connection;
        try {
            connection = await getConnection();
            const query = `SELECT * FROM events WHERE id = ? AND organizer_id = ?`;
            const [result] = await connection.execute(query, [eventId, firebaseUid]);
            return result;
        } catch (error) {
            throw error;
        } finally {
            if (connection) await releaseConnection(connection);
        }
    }


    static async updateEvent(firebaseUid, eventId, updateFields) {
        let connection;
        try {
            connection = await getConnection();
            const setClause = Object.keys(updateFields)
                .map(field => `${field} = ?`)
                .join(', ');
            const values = [...Object.values(updateFields), eventId, firebaseUid];

            const query = `
              UPDATE events 
              SET ${setClause}
              WHERE id = ? AND organizer_id = ?
          `;

            const [result] = await connection.execute(query, values);

            if (result.affectedRows === 0) {
                throw new Error('Event not found or unauthorized');
            }

            return "updated successfully";
        } catch (error) {
            throw error;
        } finally {
            if (connection) await releaseConnection(connection);
        }

    }

    static async getAllEvents() {
        let connection;
        try {
            connection = await getConnection();
            const query = `SELECT * FROM events`;
            const [result] = await connection.execute(query);
            return result;
        } catch (error) {
            throw error;
        } finally {
            if (connection) await releaseConnection(connection);
        }
    }

    static async getEventById(id) {
        let connection;
        try {
            connection = await getConnection();
            const query = `SELECT * FROM events WHERE id = ?`;
            const [result] = await connection.execute(query, [id]);
            return result;
        } catch (error) {
            throw error;
        } finally {
            if (connection) await releaseConnection(connection);
        }
    }

    static async updateEventWhileBooking(id, available_tickets) {
        if (id === undefined || available_tickets === undefined) {
            throw new Error('Both id and available_tickets are required');
        }

        let connection;
        try {
            connection = await getConnection();
            const query = `
            UPDATE events SET available_tickets = ?
            WHERE id = ?`;
            const [result] = await connection.execute(query, [available_tickets, id]);
            console.log(result, "result");
            return result;
        } catch (error) {
            throw error;
        } finally {
            if (connection) await releaseConnection(connection);
        }
    }

    static async getEventsByIds(ids) {

        let connection;
        try {
            connection = await getConnection();
            const query = `SELECT * FROM events WHERE id IN (?)`;
            const [result] = await connection.execute(query, [ids]);
            return result;
        } catch (error) {
            throw error;
        } finally {
            if (connection) await releaseConnection(connection);
        }
    }






}

export default EventModel;