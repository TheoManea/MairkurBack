const express = require('express');
require('dotenv').config();

const app = express();

const eventsRoute = require('./routes/events');
const assosRoute = require('./routes/assos');
const defaultRoute = require('./routes/default');
const authRoute = require('./routes/user');

// those routers are so sweet
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(express.urlencoded());
app.use(express.json());

// common routers
app.use('/api/events', eventsRoute);
app.use('/api/assos', assosRoute);
app.use('/api/auth', authRoute);

// default router
app.use('*', defaultRoute);

module.exports = app;