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
  posts: [
    {
      type: {
        type: String,
        required: true,
        enum: ['fanpage', 'group'],
      },
      fbParentId: {
        type: String,
        required: true,
      },
      fbPostId: {
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
