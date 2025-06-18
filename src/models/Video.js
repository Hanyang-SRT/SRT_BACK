const mongoose = require('mongoose');

/**
 * @typedef {import('mongoose').Document} Document
 */

/**
 * 비디오 정보와 관련 스크립트를 저장하기 위한 스키마
 * @typedef {Object} VideoSchema
 * @property {number} globalOrder - 시스템 내 비디오의 고유한 순차적 순서
 * @property {string} videoId - 비디오의 고유 식별자
 * @property {number} startTime - 비디오 세그먼트의 시작 시간(초 단위)
 * @property {number} endTime - 비디오 세그먼트의 종료 시간(초 단위)
 * @property {string} script - 비디오 세그먼트의 전사된 텍스트 또는 스크립트 내용
 * @property {Date} createdAt - 문서가 생성된 타임스탬프
 * @property {Date} updatedAt - 문서가 마지막으로 수정된 타임스탬프
 */

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

/**
 * Video 문서를 위한 Mongoose 모델
 * @type {import('mongoose').Model<VideoSchema & Document>}
 */
module.exports = mongoose.model('Video', VideoSchema);
