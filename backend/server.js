require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");

const venueRoutes = require("./src/routes/venueRoutes");

const bookingRoutes = require("./src/routes/bookingRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("BookMyVenue Backend Running 🚀");
});

app.use("/api/auth", authRoutes);

app.use("/api/venues", venueRoutes);

app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});