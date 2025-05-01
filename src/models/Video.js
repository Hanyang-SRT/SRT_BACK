const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema(
  {
    globalOrder: {
      type: Number,
      required: true,
      unique: true,
    },
    videoId: {
      type: String,
      required: true,
      index: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    script: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', VideoSchema);
