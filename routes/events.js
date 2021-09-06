const express = require('express');
const router = express.Router();

const eventsCtrl = require('../controllers/events');
const authMiddle = require('../middleware/auth');

/// lamdba users routers
// get events for the userhome page
router.get('/home/:idSchool', eventsCtrl.getDlyEvts);
// get a specific event
router.get('/details/:idEvent', eventsCtrl.getSpeEvts);

/// admin routers
// create a new event
router.post('/create', authMiddle, eventsCtrl.createEvts);
// edit an existing event
router.put('/edit', authMiddle, eventsCtrl.editEvts);
// delete an event
router.delete('/delete', authMiddle, eventsCtrl.deleteEvts);
// get the event of the admin management panel
router.post('/manage', authMiddle, eventsCtrl.getAdminEvts);

module.exports = router;