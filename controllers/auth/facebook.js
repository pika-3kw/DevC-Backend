const User = require('../../models/user');
const jwt = require('jsonwebtoken');

exports.postLogin = async (req, res, next) => {
  const { id, name, email, accounts } = req.body;

  let user;

  try {
    user = await User.findOne({ email });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }

  if (!user) {
    user = new User({
      name,
      email,
      facebook: {
        id,
        accounts,
      },
    });

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);

  return res.status(200).send(token);
};
