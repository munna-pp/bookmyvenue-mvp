require("dotenv").config();

const fs = require("fs");

const pool = require("./src/config/db");

const sql = fs.readFileSync("./sql/venues.sql").toString();

pool.query(sql)

.then(() => {

    console.log("Venues Table Created ✅");

    process.exit();

})

.catch((err) => {

    console.log(err);

    process.exit(1);

});