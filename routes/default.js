const express = require('express');
const router = express.Router();


router.use('/', (req, res, next) => {
    res.send('PAGE NOT FOUND, sorry bro');
});

module.exports = router;
