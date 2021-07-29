const express = require('express');
const router = express.Router();

const eventsCtrl = require('../controllers/events');

router.get('/home/:idSchool', eventsCtrl.getDlyEvts);
router.get('/detailsEvent/:idEvent', eventsCtrl.getSpeEvts);

module.exports = router;
