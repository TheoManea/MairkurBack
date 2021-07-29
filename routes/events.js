const express = require('express');
const router = express.Router();

const eventsCtrl = require('../controllers/events');

router.get('/:idSchool', eventsCtrl.getDlyEvts);
router.get('/:idEvent', eventsCtrl.getSpeEvts);

module.exports = router;
