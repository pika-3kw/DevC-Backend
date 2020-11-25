const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  message_raw: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  from: {
    name: String,
    id: String,
  },
  created_time: {
    type: String,
    required: true,
  },
  permalink_url: {
    type: String,
    required: true,
  },
  message_tags: [
    {
      name: String,
      offset: Number,
      length: Number,
    },
  ],
  parent: String,
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true,
  },
  label: {
    type: Number,
    default: '',
  },
});

// commentSchema.path('id').index({ unique: true });

module.exports = mongoose.model('Comment', commentSchema);
