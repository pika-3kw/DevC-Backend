const Campaign = require('../../models/campaign');

exports.getAllCampaigns = (req, res, next) => {
  res.send('Get All Campaigns');
};

exports.getCampaignById = (req, res, next) => {
  const campaignId = req.params.id;
  res.send(`Get Campaign ID = ${campaignId}`);
};

exports.postAddCampaign = async (req, res, next) => {
  const { name, linkFacebook, userId } = req.body;

  const campaign = new Campaign({ name, userId, linkFacebook });

  try {
    const result = await campaign.save();
    return res.status(201).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.deleteCampaignById = async (req, res, next) => {
  const campaignId = req.params.id;

  try {
    const result = await Campaign.deleteOne({ _id: campaignId });
    return res.status(201).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.putUpdateCampaignById = (req, res, next) => {
  const campaignId = req.params.id;
  res.send(`Update Campaign ID = ${campaignId}`);
};
