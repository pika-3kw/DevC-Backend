const express = require('express');

const facebookAuthController = require('../../controllers/auth/facebook');

const router = express.Router();

router.post('/login', facebookAuthController.postLogin);

module.exports = router;
