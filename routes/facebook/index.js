const express = require('express');

const facebookController = require('../../controllers/facebook');

const router = express.Router();

router.get('/:id/feed', facebookController.getFeed);

module.exports = router;
