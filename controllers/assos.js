const mysql = require('mysql');


const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

exports.getAssos = (req, res, next) => {
  // id de l'école sur laquelle recup les infos
  // check si on a toutes les var
  if (!req.params.hasOwnProperty('idSchool')) {
    return res.status(400).send("A parameter is missing");
  }
  
  idSchool = req.params.idSchool;
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