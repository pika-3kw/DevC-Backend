const express = require('express');

const router = express.Router();

const facebookRoutes = require('./facebook');

router.use('/facebook', facebookRoutes);

module.exports = router;
