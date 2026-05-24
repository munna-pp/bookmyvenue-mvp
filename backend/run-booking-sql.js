require("dotenv").config();

const fs = require("fs");

const pool = require("./src/config/db");

async function runSQL() {

  try {

    const sql = fs.readFileSync("./sql/bookings.sql").toString();

    await pool.query(sql);

    console.log("Bookings Table Created ✅");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);

  }

}

runSQL();