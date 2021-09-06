const mysql = require('mysql');
const { param } = require('../routes/events');

// config la connexions
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// get user's home page events
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

// get a specific event by its id
exports.getSpeEvts = (req, res, next) => {
  // id de l'école sur laquelle recup les infos
  // check si on a toutes les var
  if (!req.params.hasOwnProperty('idEvent')) {
    return res.status(400).send("A parameter is missing");
  }

  // connexion à la base
  connection.getConnection(function (err, connection) {
    connection.query('SELECT eventstab.title, eventstab.details, eventstab.dayStartEvent, eventstab.dayEndEvent, eventstab.ImageURL, assostab.title FROM eventstab JOIN assostab ON eventstab.idAssos=assostab.id WHERE eventstab.id=' + connection.escape(req.params.idEvent), function (error, results, fields) {
      // gère les erreurs
      if (error) throw error;

      // renvoie de la réponse
      res.status(200).json(results);
      // ferme la co
      connection.release();
    });
  });
};

// create event
exports.createEvts = (req, res, next) => {
  // params missing
  if (!req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('details') || !req.body.hasOwnProperty('dayCreation') ||
    !req.body.hasOwnProperty('dayStartEvent') || !req.body.hasOwnProperty('dayEndEvent')) {
    return res.status(400).send("Oh god ! Something went wrong ..");
  }
  // if you're lvl 2 admin and you forget to spectify the assos
  if (!req.body.hasOwnProperty('idAssos') && req.levelAccess === 2) {
    return res.status(400).send("What ? Which assos ? You made weird requests, don't you ?");
  }
  else if (req.levelAccess === 2) {
    // if he is lvl1 then he got a req.userIdAssos, otherwise, it must be provided by the lvl2
    // in this case, the lvl 2 is like into the assos he wants the created user be in (not that clear hein ?)
    req.userIdAssos = req.body.idAssos
  }

  // good, you have passed every challenges
  connection.getConnection(function (err, connection) {
    // build the '?,?,?,?,?,?,?,?' automatically
    let completeRequest = "";
    const paramsList = [req.body.title, req.body.details, req.body.userId, req.userIdAssos, req.body.dayCreation, req.body.dayStartEvent, req.body.dayEndEvent];
    paramsList.forEach(item => completeRequest += item + ',');
    // remove the ',' at the end
    completeRequest = completeRequest.substring(0, completeRequest.length - 1)

    connection.query('INSERT INTO eventstab (title, details, idAuthor, idAssos, dayCreation, dayStartEvent, dayEndEvent) VALUES (' + completeRequest + ')', function (error, results, fields) {
      // gère les erreurs
      if (error) throw error;

      // renvoie de la réponse
      res.status(200).json({ results: "success" });
      // ferme la co
      connection.release();
    });
  });
};

// if a user has access to the edition/deletion of a certain event
function verifyAccessUser(idEvent, idUser) {
  const verifyAccessUserRequest = 'SELECT eventstab.id FROM eventstab JOIN accountstab ON eventstab.idAssos=accountstab.idAssos WHERE eventstab.id=' + idEvent + ' AND accountstab.id=' + idUser;

  connection.getConnection(function (err, connection) {
    connection.query(verifyAccessUserRequest, function (error, results, fields) {
      // gère les erreurs
      if (error) throw error;

      connection.release();

      // the user has the access
      return results.length > 0

    });
  });
}

// edit event
exports.editEvts = (req, res, next) => {
  // params missing
  // req.body.id is the idEvent
  if (!req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('details') || !req.body.hasOwnProperty('id') ||
    !req.body.hasOwnProperty('dayStartEvent') || !req.body.hasOwnProperty('dayEndEvent')) {
    return res.status(400).send("Oh god ! Something went wrong ..");
  }
  // if you're lvl 2 admin and you forget to spectify the assos
  if (!req.body.hasOwnProperty('idAssos') && req.levelAccess === 2) {
    return res.status(400).send("What ? Which assos ? You made weird requests, don't you ?");
  }
  else if (req.levelAccess === 2) {
    req.userIdAssos = req.body.idAssos
  }

  // good, you have passed every challenges
  connection.getConnection(function (err, connection) {
    const updateRequest = 'UPDATE eventstab SET title=' + req.body.title + ', details=' + req.body.details + ', idAssos=' + req.userIdAssos + ', dayStartEvent=' + req.body.dayStartEvent + ', dayEndEvent=' + req.body.dayEndEvent + ' WHERE id=' + req.body.id

    // first, let's verify if the edit of this event is reachable from the user (ex : lvl1 from an other assos)
    if (levelAccess === 2 || (req.levelAccess === 1 && verifyAccessUser(req.body.id, req.body.userId))) {
      freeRequestEvts(connection, updateRequest);
    } else {
      // level 1 without access
      res.status(400).send("Access denied");
      connection.release();
    }
  });
};

// delete event
exports.deleteEvts = (req, res, next) => {
  // nothing to see here

  // params missing
  if (!req.body.hasOwnProperty('id')) {
    return res.status(400).send("Oh god ! Something went wrong ..");
  }

  // good, you have passed every challenges
  // check if the user has the permission to delete this event
  connection.getConnection(function (err, connection) {
    const deleteRequest = 'DELETE FROM eventstab WHERE id=' + req.body.id;

    // first, let's verify if the delete of this event is reachable from the user (ex : lvl1 from an other assos)
    if (levelAccess === 2 || (req.levelAccess === 1 && verifyAccessUser(req.body.id, req.body.userId))) {
      freeRequestEvts(connection, deleteRequest);
    } else {
      // level 1 without access
      res.status(400).send("Access denied");
      connection.release();
    }
  });
};

// delete event without any control
function freeRequestEvts(conn, request) {
  conn.query(request, function (error, results, fields) {
    // gère les erreurs
    if (error) throw error;

    // renvoie de la réponse
    res.status(200).json({ results: "success" });
    // ferme la co
    conn.release();
  });
};

// get admin's management page
exports.getAdminEvts = (req, res, next) => {
  // what's going on here ?
  var request = 'SELECT id, title, details, dayStartEvent, dayEndEvent, dayCreation, ImageURL FROM eventstab' + (req.levelAccess !== 2 ? ' WHERE idAssos=' + req.userIdAssos : '')

  // connexion à la base
  connection.getConnection(function (err, connection) {
    connection.query(request, function (error, results, fields) {
      // gère les erreurs
      if (error) throw error;

      // renvoie de la réponse
      res.status(200).json(results);
      // ferme la co
      connection.release();
    });
  });
}