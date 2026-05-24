CREATE TABLE IF NOT EXISTS bookings (

  id SERIAL PRIMARY KEY,

  user_id INTEGER REFERENCES users(id),

  venue_id INTEGER REFERENCES venues(id),

  booking_date DATE NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);