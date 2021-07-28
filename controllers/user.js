const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

/*exports.signup = (req, res, next) => {
    pass;
};*/


exports.login = (req, res, next) => {
    // required body param check
    if (!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password')) {
        return res.status(400).send("Oh, sh*t ! A parameter is missing right here !");
    }

    var email = connection.escape(req.body.email);
    var password = req.body.password;

    // connection to the db
    connection.getConnection(function (err, connection) {
        connection.query("SELECT id, password FROM accountstab WHERE email="+email, function (error, results, fields) {
            // gère les erreurs
            if (error) throw error;

            if (!results) {
                return res.status(200).json({error : "user not found"})
            }
            
            bcrypt.compare(password, results.password)
            .then(valid =>{
                if (!valid) {
                    return res.status(400).json({error : "wrong password"})
                }
                res.status(200).json({
                    id: results.id,
                    token: jwt.sign(
                        {userId: results.id},
                        process.env.SECRET_TOK
                        )
                })
            })
            .catch(error => res.status(500).json({error}))
        
            // ferme les flux
            connection.release();
        });
    });
};


exports.getAssos = (req, res, next) => {
    // id de l'école sur laquelle recup les infos
    // check si on a toutes les var
    if (!req.body.hasOwnProperty('idSchool')) {
        return res.status(400).send("idSchool is require");
    }

    idSchool = req.body.idSchool;
    idSchool = connection.escape(idSchool);

    // connexion à la base
    connection.getConnection(function (err, connection) {
        connection.query('SELECT * FROM assostab WHERE idSchool=' + idSchool + ' ORDER BY title ASC', function (error, results, fields) {
            // gère les erreurs
            if (error) throw error;

            // renvoie de la réponse
            res.status(200).json(results);
            // ferme la co
            connection.release();
        });
    });
};