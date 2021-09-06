const jwt = require('jsonwebtoken');
const mysql = require('mysql');

// config la connexions
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

module.exports = (req, res, next) => {
    try {
        // decode token in the headers
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOK);
        const userId = decodedToken.userId;
        // if userId from the headers and from the body are different
        if (!req.body.hasOwnProperty("userId") || parseInt(req.body.userId) !== userId) {
            throw 'Who are you ?';
        } else {
            // otherwise, let's take the lvlAccess from the db
            connection.getConnection(function (err, connection) {
                connection.query('SELECT levelAccess, idAssos, idSchool FROM accountstab WHERE id=' + connection.escape(userId), function (error, results, fields) {
                    // manage errors
                    if (error) throw error;

                    // next with parameter
                    req.levelAccess = parseInt(results[0].levelAccess);
                    if (results[0].idAssos) {
                        req.userIdAssos = parseInt(results[0].idAssos);
                    }

                    // ferme la co
                    connection.release();

                    next();
                })
            });
        }
    } catch {
        res.status(401).json({
            error: 'Oh god, something went wrong ..'
        });
    }

};