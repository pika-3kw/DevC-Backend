const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ error: 'You must be logged in' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = await jwt.verify(token, process.env.JWT_KEY);

    const { userId } = payload;

    const user = await User.findById(userId);

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: 'Unauthorized' });
  }
};
