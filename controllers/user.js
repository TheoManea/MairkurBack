const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

exports.login = (req, res, next) => {

    // required body param check
    if (!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password')) {
        return res.status(400).send("Oh, sh*t ! A parameter is missing right here !");
    }

    var email = connection.escape(req.body.email);

    // connection to the db
    connection.getConnection(function (err, connection) {
        connection.query("SELECT id, password FROM accountstab WHERE email=" + email, function (error, results, fields) {
            // gère les erreurs
            if (error) throw error;

            if (!results[0].hasOwnProperty('password')) {
                return res.status(200).json({ error: "user not found" })
            }
            console.log(results)
            bcrypt.compare(req.body.password, results[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(400).json({ error: "wrong password" })
                    }
                    res.status(200).json({
                        id: results[0].id,
                        token: jwt.sign(
                            { userId: results[0].id },
                            process.env.SECRET_TOK
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }));

            // ferme les flux
            connection.release();
        });
    });
};