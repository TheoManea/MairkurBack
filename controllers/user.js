const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendmail = require('sendmail')();

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// login router
exports.login = (req, res, next) => {

    // required body param check
    if (!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password')) {
        return res.status(400).send("Oh, sh*t ! A parameter is missing right here !");
    }

    var email = connection.escape(req.body.email);

    // connection to the db
    connection.getConnection(function (err, connection) {
        connection.query("SELECT id, password, name, familyName, levelAccess FROM accountstab WHERE email=" + email, function (error, results, fields) {
            // gère les erreurs
            if (error) throw error;

            // nobody found
            if (results.length === 0) {
                return res.status(200).json({ error: "user not found" })
            }

            // compare password stored and gave
            bcrypt.compare(req.body.password, results[0].password)
                .then(valid => {
                    // invalid password
                    if (!valid) {
                        return res.status(400).json({ error: "wrong password" })
                    }
                    res.status(200).json({
                        id: results[0].id,
                        name: results[0].name,
                        familyName: results[0].familyName,
                        levelAccess: results[0].levelAccess,
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

//* create user router
exports.create = (req, res, next) => {
    // params missing or try to create a lvl1 without giving him an assos
    // req.body.levelAccess : levelAccess provide by the user
    // req.levelAccess : levelAccess of the current user

    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('familyName') || !req.body.hasOwnProperty('levelAccess') ||
        !req.body.hasOwnProperty('email') || (req.body.levelAccess !== 2 && !req.body.hasOwnProperty('idAssos'))) {
        return res.status(400).send("Oh god ! Something went wrong ..");
    }

    var idAssosAssign;
    if (req.body.levelAccess === 2) {
        idAssosAssign = 'NULL';
    } else {
        idAssosAssign = toString(req.body.idAssos)
    }

    // generate a random password
    var password = "";
    // ##############

    // add it on the data base
    connection.getConnection(function (err, connection) {
        connection.query('INSERT INTO accountstab(name, familyName, levelAccess, idAssos, email) VALUES (' + connection.escape(req.body.name) + ',' + connection.escape(req.body.familyName) + ',' + connection.escape(req.body.levelAccess) + ',' + connection.escape(idAssosAssign) + ',' + connection.escape(req.body.email) + ')', function (error, results, fields) {
            // gère les erreurs
            if (error) throw error;

            // renvoie de la réponse
            res.status(200).json({ results: "success" });
            // ferme la co
            connection.release();
        });
    });

    // send the password to the user by email, and telling him he can change it if he wants
    // ##############

};

//* edit user router
exports.edit = (req, res, next) => {
    /* 
    his account (lvl 1 or 2): `name`, `familyName`, `password`, `email` -> connect to the new email /!\
    others account (lvl 2):  `levelAccess`, `idAssos`, `email` ~~> think again about all rights of a lvl 2
    */

    // params missing
    if (!req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('details') || !req.body.hasOwnProperty('id')) {
        return res.status(400).send("Oh god ! Something went wrong ..");
    }

    // good, you have passed every challenges
    connection.getConnection(function (err, connection) {
        connection.query('UPDATE assostab SET title=' + connection.escape(req.body.title) + ', details=' + connection.escape(req.body.details) + ' WHERE id=' + connection.escape(req.body.id), function (error, results, fields) {
            // gère les erreurs
            if (error) throw error;

            // renvoie de la réponse
            res.status(200).json({ results: "success" });
            // ferme la co
            connection.release();
        });
    });
};

//* own edit profile router
exports.ownEdit = (req, res, next) => {
    //No params is missing
    // if you change your email, we will send you a verif email before changing it
    // so to speak the new email is effective when it has been verified
    // params missing
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('familyName') || !req.body.hasOwnProperty('password') ||
        !req.body.hasOwnProperty('email')) {
        return res.status(400).send("Oh god ! Something went wrong ..");
    }

    // good, you have passed every challenges
    connection.getConnection(function (err, connection) {
        connection.query('UPDATE assostab SET title=' + connection.escape(req.body.title) + ', details=' + connection.escape(req.body.details) + ' WHERE id=' + connection.escape(req.body.id), function (error, results, fields) {
            // gère les erreurs
            if (error) throw error;

            // renvoie de la réponse
            res.status(200).json({ results: "success" });
            // ferme la co
            connection.release();
        });
    });
};

// delete user router
exports.delete = (req, res, next) => {
    // params missing
    if (!req.body.hasOwnProperty('id')) {
        return res.status(400).send("Oh god ! Something went wrong ..");
    }

    connection.getConnection(function (err, connection) {
        // avoid deleting the super admin
        connection.query('DELETE FROM eventstab WHERE id<>1 AND id=' + connection.escape(req.body.id), function (error, results, fields) {
            // gère les erreurs
            if (error) throw error;

            // renvoie de la réponse
            res.status(200).json({ results: "success" });
            // ferme la co
            connection.release();
        });
    });
};

// get all users
exports.getAdminUsers = (req, res, next) => {
    connection.getConnection(function (err, connection) {
        // `id`, `name`, `familyName`, `password`, `levelAccess`, `idAssos`, `idSchool`, `email`
        connection.query('SELECT id, name, familyName, levelAccess, idAssos, email FROM accountstab', function (error, results, fields) {
            // gère les erreurs
            if (error) throw error;

            // renvoie de la réponse
            res.status(200).json(results);
            // ferme la co
            connection.release();
        });
    });
}

// test nodemail module
exports.mailer = (req, res, next) => {
    sendmail({
        from: 'gmail@chucknorris.com',
        to: 'johncena@mozej.com',
        subject: "coucou c'est le backend !",
        text: '<h1>Si tu lis ce message, ça veut dire que le module de mail marche</h1>'
    }, function (err, reply) {
        console.log(err && err.stack)
        console.dir(reply)
    })

    res.status(200).json({ message: "c'est envoyé ma couille !" });
}