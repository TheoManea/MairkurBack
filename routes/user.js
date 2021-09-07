const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const authMiddle = require('../middleware/auth');
const lvl2oly = require('../middleware/level2Only');

// lambda user router
router.post('/login', userCtrl.login);

// admin routers
// disable for now
// create user
// router.post('/create', authMiddle, lvl2oly, userCtrl.create);

// edit user
// router.put('/edit', authMiddle, lvl2oly, userCtrl.edit);

// edit own profile
// router.put('/ownedit', authMiddle, userCtrl.ownEdit);

// delete user
router.delete('/delete', authMiddle, lvl2oly, userCtrl.delete);

// get all users
router.post('/manage', authMiddle, lvl2oly, userCtrl.getAdminUsers);

module.exports = router;