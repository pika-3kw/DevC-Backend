const express = require('express');

const campaignController = require('../../controllers/campaign');

const router = express.Router();

router.get('/', campaignController.getAllCampaigns);

router.get('/:id', campaignController.getCampaignById);

router.post('/', campaignController.postCampaign);

router.delete('/:id', campaignController.deleteCampaignById);

router.put('/:id', campaignController.putCampaignById);

module.exports = router;
