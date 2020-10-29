const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const campaignSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  linkFacebook: [
    {
      type: {
        type: String,
        required: true,
        enum: ['fanpage', 'group'],
      },
      parentId: {
        type: String,
        required: true,
      },
      postId: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Campaign', campaignSchema);
