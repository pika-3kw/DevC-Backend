const express = require('express');

const facebookController = require('../../controllers/facebook');

const router = express.Router();

router.get('/:id/feed', facebookController.getFeed);

router.get('/:id/comment', facebookController.getComments);

module.exports = router;
