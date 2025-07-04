const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');

const indexRouter = require('./src/routes/index-route');
const contentRouter = require('./src/routes/content-route');
const uploadRouter = require('./src/routes/upload-route');
const errorHandler = require('./src/middlewares/error-handler');

// const mongoose = require('mongoose');
// const RefAudio = require('./src/models/RefAudio'); // 모델 경로에 맞게 조정

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 3000);

// 보안 관련 미들웨어 및 로깅 설정 (production 환경에 따른 설정)
if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
  app.use(morgan('combined')); // 생산 환경에서는 'combined'로 로깅
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
} else {
  app.use(morgan('dev')); // 개발 환경에서는 'dev'로 로깅
}

const allowedOrigin = ['http://localhost:5500', 'http://127.0.0.1:5500'];

// CORS 설정
app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 세션 설정
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // production 환경에서는 secure 속성 설정
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 세션 만료 시간 설정 (1시간)
    },
  })
);

app.use('/api', indexRouter);

app.use('/api/contents', contentRouter);

app.use('/api/upload', uploadRouter);

app.use(errorHandler);

connectDB();

// async function addTestRefAudio() {
//   await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   // 테스트 데이터
//   const testRefAudio = new RefAudio({
//     globalOrder: 9,
//     audio_path: '/data/audio/summer.wav',
//   });

//   await testRefAudio.save();
//   console.log('테스트 데이터 저장 완료!');
//   mongoose.disconnect();
// }

// addTestRefAudio();

// 서버 시작
app.listen(app.get('port'), () => {
  console.log(`Server running on http://localhost:${app.get('port')}`);
});
