const { request } = require('express');
const express = require('express');
const router = express.Router();

const assosCtrl = require('../controllers/assos');
const authMiddle = require('../middleware/auth');
const lvl2oly = require('../middleware/level2Only');

// lambda user
router.get('/home', assosCtrl.getAssos);
router.get('/details/:idAssos', assosCtrl.getSpeAssos);

// admin user
// create a new assos
router.post('/create', authMiddle, lvl2oly, assosCtrl.createAssos);
// edit an existing assos
router.put('/edit', authMiddle, lvl2oly, assosCtrl.editAssos);
// delete an assos
router.delete('/delete', authMiddle, lvl2oly, assosCtrl.deleteAssos);
// get the assos of the admin management panel
router.post('/manage', authMiddle, lvl2oly, assosCtrl.getAdminAssos)

module.exports = router;
