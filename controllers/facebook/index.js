const getFeed = require('../../function/getFeed');

exports.getFeed = async (req, res, next) => {
  const { id } = req.params;

  const { token } = req.user.facebook;

  try {
    const feed = await getFeed(id, token);

    res.status(200).send(feed.data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
