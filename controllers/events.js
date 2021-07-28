const mysql = require('mysql');


/*const connection = mysql.createPool({
  host : "mairkuradmin.cqsuwbp2v89w.eu-west-3.rds.amazonaws.com",
  port : 3306,
  user : "mairkuradmin",
  password : "aE%p8b72",
  database : "ebdb"
});*/

// config la connexions
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


exports.getDlyEvts = (req, res, next) => {

  console.log("t'es dedans")
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