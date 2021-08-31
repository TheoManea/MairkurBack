const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const authMiddle = require('../middleware/auth');
const lvl2oly = require('../middleware/level2Only');

// lambda user router
router.post('/login', userCtrl.login);

// admin routers
router.post('/create', authMiddle, lvl2oly, userCtrl.create);

// disable for now
// router.post('/edit', authMiddle, lvl2oly, userCtrl.edit);
// router.post('/delete', authMiddle, lvl2oly, userCtrl.delete);

module.exports = router;