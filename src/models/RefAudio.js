const mongoose = require('mongoose');

/**
 * @typedef {import('mongoose').Document} Document
 */

/**
 * 참조 오디오 파일 정보를 저장하기 위한 스키마
 * @typedef {Object} RefAudioSchema
 * @property {number} globalOrder - 시스템 내 참조 오디오의 고유한 순차적 순서
 * @property {string} audio_path - 참조 오디오 파일의 저장 경로
 * @property {Date} createdAt - 문서가 생성된 타임스탬프
 * @property {Date} updatedAt - 문서가 마지막으로 수정된 타임스탬프
 */

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

/**
 * RefAudio 문서를 위한 Mongoose 모델
 * @type {import('mongoose').Model<RefAudioSchema & Document>}
 */
module.exports = mongoose.model('RefAudio', RefAudioSchema);
