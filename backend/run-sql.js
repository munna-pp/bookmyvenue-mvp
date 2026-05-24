const fs = require("fs");
const pool = require("./src/config/db");

async function runSQL() {

  try {

    const sql = fs.readFileSync("./sql/users.sql").toString();

    await pool.query(sql);

    console.log("Users Table Created ✅");

  } catch (error) {

    console.log(error);

  }

}

runSQL();