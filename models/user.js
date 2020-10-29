const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const facebookSchema = new Schema({
  id: String,
  accounts: {
    data: [
      {
        id: String,
        name: String,
      },
    ],
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: String,
  avatarUrl: String,
  facebook: facebookSchema,
  campaigns: [
    {
      campaignId: {
        type: Schema.Types.ObjectId,
        ref: 'Campaign',
      },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
