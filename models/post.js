const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['fanpage', 'group'],
  },
  fbParentId: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  permalink_url: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  campaign: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true,
  },
});

postSchema.set('timestamps', true);

module.exports = mongoose.model('Post', postSchema);
