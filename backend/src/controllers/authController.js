const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("../config/db");


// REGISTER
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


// LOGIN
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await pool.query(

            `SELECT * FROM users WHERE email = $1`,

            [email]

        );

        if (user.rows.length === 0) {

            return res.status(400).json({

                error: "User Not Found"

            });

        }

        const validPassword = await bcrypt.compare(

            password,
            user.rows[0].password

        );

        if (!validPassword) {

            return res.status(400).json({

                error: "Invalid Password"

            });

        }

        const token = jwt.sign(

            {

                id: user.rows[0].id,
                email: user.rows[0].email

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );

        res.json({

            message: "Login Successful ✅",

            token

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: "Server Error"

        });

    }

};

module.exports = {

    registerUser,
    loginUser

};