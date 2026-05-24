const bcrypt = require("bcrypt");

const pool = require("../config/db");

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(

            `INSERT INTO users (name, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, name, email`,

            [name, email, hashedPassword]

        );

        res.status(201).json({

            message: "User Registered Successfully ✅",

            user: newUser.rows[0]

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: "Server Error"

        });

    }

};

module.exports = {

    registerUser

};