const mysql = require('mysql');

// config la connexions
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


exports.getDlyEvts = (req, res, next) => {
  // id de l'école sur laquelle recup les infos
  // check si on a toutes les var
  if (!req.params.hasOwnProperty('idSchool')) {
    return res.status(400).send("A parameter is missing");
  }

  idSchool = req.params.idSchool;
  idSchool = connection.escape(idSchool);

  // connexion à la base
  connection.getConnection(function (err, connection) {
    connection.query('( SELECT * FROM eventstab WHERE ( (NOW() BETWEEN dayStartEvent AND dayEndEvent AND dayStartEvent <> dayEndEvent) OR (CURRENT_DATE() = DATE(dayStartEvent)) ) AND idSchool = ' + idSchool + ' ORDER BY DATE(dayStartEvent) ASC, dayStartEvent ASC ) UNION ( SELECT * FROM eventstab WHERE dayStartEvent > NOW() AND idSchool = ' + idSchool + ' ORDER BY DATE(dayStartEvent) ASC, dayStartEvent ASC LIMIT 10 ) ', function (error, results, fields) {
      // gère les erreurs
      if (error) throw error;

      // renvoie de la réponse
      res.status(200).json(results);
      // ferme la co
      connection.release();
    });
  });
};

// get a specific event by his id
exports.getSpeEvts = (req, res, next) => {
  // id de l'école sur laquelle recup les infos
  // check si on a toutes les var
  if (!req.params.hasOwnProperty('idEvent')) {
    return res.status(400).send("A parameter is missing");
  }

  // connexion à la base
  connection.getConnection(function (err, connection) {
    connection.query('SELECT eventstab.title, eventstab.details, eventstab.dayStartEvent, eventstab.dayEndEvent, eventstab.ImageURL, assostab.title FROM eventstab JOIN assostab ON eventstab.idAssos=assostab.id WHERE eventstab=' + connection.escape(req.params.idEvent), function (error, results, fields) {
      // gère les erreurs
      if (error) throw error;

      // renvoie de la réponse
      res.status(200).json(results);
      // ferme la co
      connection.release();
    });
  });
};
