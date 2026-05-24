const express = require("express");

const router = express.Router();

const pool = require("../config/db");



router.get("/", async (req, res) => {

  try {

    const venues = await pool.query(
      "SELECT * FROM venues ORDER BY id DESC"
    );

    res.json({
      message: "Venues Fetched ✅",
      venues: venues.rows
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});



router.post("/", async (req, res) => {

  try {

    const { name, location, price, capacity } = req.body;

    const newVenue = await pool.query(
      `
      INSERT INTO venues
      (name, location, price, capacity)

      VALUES ($1, $2, $3, $4)

      RETURNING *;
      `,
      [name, location, price, capacity]
    );

    res.status(201).json({
      message: "Venue Created ✅",
      venue: newVenue.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

module.exports = router;