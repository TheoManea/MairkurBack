const mysql = require('mysql');

// pour se co à la bdd
/*const connection = mysql.createPool({
    host : "mysql57.evxonline.net",
    port : 3306,
    user : "mairkuradmin",
    password : "aE%p8b72",
    database : "mairkurdb"
  });*/

const connection = mysql.createPool({
  host : "mairkuradmin.cqsuwbp2v89w.eu-west-3.rds.amazonaws.com",
  port : 3306,
  user : "mairkuradmin",
  password : "aE%p8b72",
  database : "ebdb"
});

exports.getDlyEvts = (req, res, next) => {
    //res.json({message : process.env.DB_PORT});
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
  
        // Executing the MySQL query (select all data from the 'users' table).
        connection.query('SELECT * FROM eventstab', function (error, results, fields) {
          // If some error occurs, we throw an error.
          if (error) throw error;
    
          // Getting the 'response' from the database and sending it to our route. This is were the data is.
          res.status(200).send(results)
        });
      });
};