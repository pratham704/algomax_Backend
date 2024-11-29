-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    firebaseUid VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    role ENUM('user', 'organizer', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Events Table
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
    total_tickets INT,
    available_tickets INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(firebaseUid) ON DELETE CASCADE
);

-- Create Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id CHAR(36) PRIMARY KEY,
    event_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    tickets_booked INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(firebaseUid) ON DELETE CASCADE
);

-- Create Wishlists Table
CREATE TABLE IF NOT EXISTS wishlists (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    event_id CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Create Notifications Table
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

-- Create Analytics Table
CREATE TABLE IF NOT EXISTS analytics (
    id CHAR(36) PRIMARY KEY,
    event_id CHAR(36) NOT NULL,
    tickets_sold INT DEFAULT 0,
    revenue_generated DECIMAL(10, 2) DEFAULT 0.00,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Create Indexes
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_bookings_event ON bookings(event_id);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_wishlists_user ON wishlists(user_id);
CREATE INDEX idx_wishlists_event ON wishlists(event_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_analytics_event ON analytics(event_id);