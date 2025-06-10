const mongoose = require('mongoose');

const RefAudioSchema = mongoose.Schema(
  {
    globalOrder: {
      type: Number,
      required: true,
      index: true,
    },
    audio_path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RefAudio', RefAudioSchema);
