const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbURI = process.env.MONGO_URI;

// MongoDB 연결 함수
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURI, {
      dbName: 'srt',
    });

    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // 연결 실패 시 프로세스 종료
  }
};

// 연결 이벤트 핸들링
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러:', error);
});

mongoose.connection.on('disconnected', () => {
  console.warn('몽고디비 연결이 끊어졌습니다.');
  // 재연결 로직은 필요 시 추가
});

module.exports = { connectDB, mongoose };
