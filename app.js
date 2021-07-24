const express = require('express');

const app = express();

const eventsRoute = require('./routes/events');
const defaultRoute = require('./routes/default');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/events', eventsRoute);
app.use('*', defaultRoute);

module.exports = app;