const mongoose = require('mongoose');
const Campaign = require('../../models/campaign');
const Post = require('../../models/post');

exports.getAllCampaigns = async (req, res, next) => {
  try {
    const result = await Campaign.find();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.getCampaignById = async (req, res, next) => {
  const campaignId = req.params.id;

  try {
    const campaign = await Campaign.findById(campaignId);

    res.status(200).send(campaign);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }

  res.send(`Get Campaign ID = ${campaignId}`);
};

exports.postAddCampaign = async (req, res, next) => {
  let { name, userId, posts } = req.body;

  const campaign = new Campaign({ name, createdBy: userId });

  try {
    const campaignResult = await campaign.save();

    posts = posts.map((post) => ({
      ...post,
      campaign: mongoose.Types.ObjectId(campaignResult._id),
    }));

    const postResult = await Post.insertMany(posts);
    return res.status(201).send({ campaignResult, postResult });
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
