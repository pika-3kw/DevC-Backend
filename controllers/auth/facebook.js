const axios = require('axios');
const jwt = require('jsonwebtoken');

const getFacebookInfo = require('../../function/getFacebookInfo');
const getLongLivedToken = require('../../function/getLongLivedToken');

const User = require('../../models/user');

exports.postLogin = async (req, res) => {
  let { fbToken } = req.body;
  let fbInfo;

  try {
    fbToken = await getLongLivedToken(fbToken);
    fbInfo = await getFacebookInfo(fbToken);
  } catch (error) {
    console.log(error);
  }

  let { email, name, id, accounts } = fbInfo;

  const info = {
    email,
    name,
    facebook: {
      id,
      accounts,
      token: fbToken,
    },
  };

  let user;

  try {
    user = await User.findOneAndUpdate({ email: info.email }, info, {
      upsert: true,
    });
  } catch (error) {
    console.log(user);
  }

  const token = jwt.sign({ userId: user._id, fbToken }, process.env.JWT_KEY);

  user.facebook.token = undefined;

  return res.status(200).json({ jwtToken: token, info: user });
};

exports.postCheckToken = async (req, res) => {
  const { jwtToken } = req.body;

  let userId, fbToken;

  try {
    const payload = await jwt.verify(jwtToken, process.env.JWT_KEY);

    userId = payload.userId;
    fbToken = payload.fbToken;

    const user = await User.findById(userId);

    req.user = user;
  } catch (error) {
    console.log(error);
  }

  try {
    info = await getFacebookInfo(fbToken);

    if (info.error) {
      return res.json({ access: false });
    }
    res.json({ access: true });
  } catch (error) {
    console.log(error);
  }
};
