const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const eventsRoute = require('./routes/events');
const assosRoute = require('./routes/assos');
const defaultRoute = require('./routes/default');
const authRoute = require('./routes/user');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(bodyParser.json());

app.use('/api/auth', authRoute)
app.use('/api/events', eventsRoute);
app.use('/api/assos', assosRoute)
app.use('*', defaultRoute);

module.exports = app;