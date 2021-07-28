const express = require('express');
const router = express.Router();

const assosCtrl = require('../controllers/assos');

router.get('/:idSchool', assosCtrl.getAssos);

module.exports = router;
