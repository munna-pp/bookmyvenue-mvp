const express = require("express");

const router = express.Router();

const pool = require("../config/db");


// CREATE BOOKING
router.post("/", async (req, res) => {

  try {

    const {

      user_id,
      venue_id,
      booking_date

    } = req.body;

    const booking = await pool.query(

      `
      INSERT INTO bookings
      (user_id, venue_id, booking_date)

      VALUES ($1, $2, $3)

      RETURNING *;
      `,

      [

        user_id,
        venue_id,
        booking_date

      ]

    );

    res.status(201).json({

      message: "Venue Booked Successfully ✅",

      booking: booking.rows[0]

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error"

    });

  }

});


// GET BOOKINGS
router.get("/", async (req, res) => {

  try {

    const bookings = await pool.query(

      `
      SELECT * FROM bookings
      ORDER BY id DESC
      `

    );

    res.json({

      message: "Bookings Fetched ✅",

      bookings: bookings.rows

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error"

    });

  }

});

module.exports = router;