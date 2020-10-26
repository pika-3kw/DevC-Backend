const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  avatarUrl: String,
  facebook: {
    id: String,
    accounts: {
      data: [
        {
          id: String,
          name: String,
          _id: false,
        },
      ],
    },
  },
});

module.exports = mongoose.model('user', userSchema);
