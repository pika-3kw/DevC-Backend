const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const campaignSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
  ],
});

campaignSchema.set('timestamps', true);

module.exports = mongoose.model('Campaign', campaignSchema);
