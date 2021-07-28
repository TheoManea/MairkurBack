const express = require('express');
const router = express.Router();

const assosCtrl = require('../controller/assos');

router.get('/', assosCtrl.getAssos);

module.exports = router;
