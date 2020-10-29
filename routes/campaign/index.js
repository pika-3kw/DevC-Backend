const express = require('express');

const campaignController = require('../../controllers/campaign');

const router = express.Router();

router.get('/all', campaignController.getAllCampaigns);

router.get('/:id', campaignController.getCampaignById);

router.post('/add', campaignController.postAddCampaign);

router.delete('/delete/:id', campaignController.deleteCampaignById);

router.put('/update/:id', campaignController.putUpdateCampaignById);

module.exports = router;
