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
  name: String,
  email: String,
  password: String,
  avatarUrl: String,
  facebook: facebookSchema,
  campaigns: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
    },
  ],
});

userSchema.set('timestamps', true);

module.exports = mongoose.model('User', userSchema);
