const mongoose = require('mongoose');
const Campaign = require('../../models/campaign');
const Post = require('../../models/post');
const User = require('../../models/user');

exports.getAllCampaigns = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const result = await Campaign.find({ createdBy: userId });
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

exports.postCampaign = async (req, res, next) => {
  let { name, posts } = req.body;

  const user = req.user;

  const campaign = new Campaign({ name, createdBy: user._id });

  try {
    const campaignResult = await campaign.save();

    posts = posts.map((post) => ({
      ...post,
      campaign: mongoose.Types.ObjectId(campaignResult._id),
    }));

    await Post.insertMany(posts);

    return res.status(201).send(campaignResult);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.deleteCampaignById = async (req, res, next) => {
  const campaignId = req.params.id;
  const userID = req.user._id;

  try {
    const user = await User.findById(userID);

    if (!user) {
      return res.status(401).send(user);
    }
    const result = await Campaign.deleteOne({ _id: campaignId });
    if (result.deletedCount === 1) {
      return res.status(201).send({ message: 'OK' });
    }
    res.status(304).send({ message: 'False' });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.putCampaignById = (req, res, next) => {
  const campaignId = req.params.id;
  res.send(`Update Campaign ID = ${campaignId}`);
};
