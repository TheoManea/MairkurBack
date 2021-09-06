const mysql = require('mysql');


const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// get labda user's home page
exports.getAssos = (req, res, next) => {
  // connexion à la base
  connection.getConnection(function (err, connection) {
    connection.query('SELECT id, title, details FROM assostab ORDER BY title ASC', function (error, results, fields) {
      // gère les erreurs
      if (error) throw error;

      // renvoie de la réponse
      res.status(200).json(results);
      // ferme la co
      connection.release();
    });
  });
};

// get a specific assos by its id
exports.getSpeAssos = (req, res, next) => {
  // id de l'école sur laquelle recup les infos
  // check si on a toutes les var
  if (!req.params.hasOwnProperty('idAssos')) {
    return res.status(400).send("A parameter is missing");
  }

  // connexion à la base
  connection.getConnection(function (err, connection) {
    connection.query('SELECT title, details FROM assostab WHERE id=' + connection.escape(req.params.idAssos), function (error, results, fields) {
      // gère les erreurs
      if (error) throw error;

      // renvoie de la réponse
      res.status(200).json(results);
      // ferme la co
      connection.release();
    });
  });
};

// create assos
exports.createAssos = (req, res, next) => {
  // params missing
  if (!req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('details')) {
    return res.status(400).send("Oh god ! Something went wrong ..");
  }

  // good, you have passed every challenges
  connection.getConnection(function (err, connection) {
    connection.query('INSERT INTO assostab (title, details) VALUES (' + req.body.title + ', ' + req.body.details + ')', function (error, results, fields) {
      // gère les erreurs
      if (error) throw error;

      // renvoie de la réponse
      res.status(200).json({ results: "success" });
      // ferme la co
      connection.release();
    });
  });
};

// edit assos
exports.editAssos = (req, res, next) => {
  // params missing
  if (!req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('details') || !req.body.hasOwnProperty('id')) {
    return res.status(400).send("Oh god ! Something went wrong ..");
  }

  // good, you have passed every challenges
  connection.getConnection(function (err, connection) {
    connection.query('UPDATE assostab SET title=' + req.body.title + ', details=' + req.body.details + ' WHERE id=' + req.body.id, function (error, results, fields) {
      // gère les erreurs
      if (error) throw error;

      // renvoie de la réponse
      res.status(200).json({ results: "success" });
      // ferme la co
      connection.release();
    });
  });
};

// delete event
exports.deleteAssos = (req, res, next) => {
  // nothing to see here

  // params missing
  if (!req.body.hasOwnProperty('id')) {
    return res.status(400).send("Oh god ! Something went wrong ..");
  }

  // good, you have passed every challenges
  // check if the user has the permission to delete this event
  connection.getConnection(function (err, connection) {
    connection.query('DELETE FROM eventstab WHERE id=' + req.body.id, function (error, results, fields) {
      // gère les erreurs
      if (error) throw error;

      // renvoie de la réponse
      res.status(200).json({ results: "success" });
      // ferme la co
      connection.release();
    });
  });
};

// get admin's management page
exports.getAdminAssos = (req, res, next) => {
  // what's going on here ?

  // connexion à la base
  connection.getConnection(function (err, connection) {
    connection.query('SELECT title, details FROM assostab', function (error, results, fields) {
      // gère les erreurs
      if (error) throw error;

      // renvoie de la réponse
      res.status(200).json(results);
      // ferme la co
      connection.release();
    });
  });
}