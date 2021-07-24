const express = require('express');
const router = express.Router();

const eventsCtrl = require('../controller/events');

router.get('/', eventsCtrl.getDlyEvts);

module.exports = router;
