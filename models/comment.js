const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
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
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      offset: {
        type: Number,
        required: true,
      },
      length: {
        type: Number,
        required: true,
      },
    },
  ],
  from: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  parent: {
    id: {
      type: String,
      required: true,
    },
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
