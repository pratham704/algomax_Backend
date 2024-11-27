import { getConnection } from '../../config/database.js';

class WishlistModel {
    static async createTable() {
        const connection = await getConnection();
        const query = `
      CREATE TABLE IF NOT EXISTS wishlists (
        id CHAR(36) PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        event_id CHAR(36) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
      );
    `;
        await connection.execute(query);
        console.log('Wishlists table created.');
    }

    static async addToWishlist({ userId, eventId }) {
        const connection = await getConnection();
        const query = `
      INSERT INTO wishlists (id, user_id, event_id)
      VALUES (UUID(), ?, ?);
    `;
        await connection.execute(query, [userId, eventId]);
    }


}

export default WishlistModel;