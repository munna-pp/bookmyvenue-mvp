const express = require("express");

const router = express.Router();

const {

    createVenue,
    getVenues

} = require("../controllers/venueController");

router.post("/", createVenue);

router.get("/", getVenues);

module.exports = router;