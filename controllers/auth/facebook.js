const User = require('../../models/user');

exports.postLogin = async (req, res, next) => {
  const { id, name, email, accounts } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }

  const newUser = new User({
    name,
    email,
    facebook: {
      id,
      accounts,
    },
  });

  try {
    const result = await newUser.save();
    return res.status(201).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
