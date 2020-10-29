exports.getAllCampaigns = (req, res, next) => {
  res.send('Get All Campaigns');
};

exports.getCampaignById = (req, res, next) => {
  const campaignId = req.params.id;
  res.send(`Get Campaign ID = ${campaignId}`);
};

exports.postAddCampaign = (req, res, next) => {
  res.send(`Post Add Campaign`);
};

exports.deleteCampaignById = (req, res, next) => {
  const campaignId = req.params.id;
  res.send(`Delete Campaign ID = ${campaignId}`);
};

exports.putCampaignById = (req, res, next) => {
  const campaignId = req.params.id;
  res.send(`Update Campaign ID = ${campaignId}`);
};
