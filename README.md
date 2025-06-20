# SRT (Speech Recognition Trainer)

## 개요

SRT는 음성 인식 학습을 위한 API 서버입니다. 사용자의 음성을 참조 오디오와 비교하여 분석 결과를 제공하며, 교육/연습용 음성 데이터 관리와 평가 기능을 지원합니다.

---

## 폴더 구조

```
SRT/
├── app.js
├── audio/
├── config/
│   └── database.js
├── key/
├── src/
│   ├── controllers/
│   │   ├── content-controller.js
│   │   ├── index-controller.js
│   │   └── upload-controller.js
│   ├── middlewares/
│   │   ├── error-handler.js
│   │   └── upload-handler.js
│   ├── models/
│   │   ├── RefAudio.js
│   │   └── Video.js
│   ├── routes/
│   │   ├── content-route.js
│   │   ├── index-route.js
│   │   └── upload-route.js
│   └── services/
│       ├── content-service.js
│       └── upload-service.js
├── package.json
└── README.md
```

---

## Development Setting (기술 및 버전)

- Node.js (v18 이상 권장)
- Express ^5.1.0
- MongoDB (Mongoose ^8.14.1)
- Babel (ES6+ 지원)
- 기타: dotenv, cors, helmet, morgan 등

---

## Libraries & Tools

- **express**: 웹 서버 및 라우팅
- **mongoose**: MongoDB ODM
- **multer**: 파일 업로드 처리
- **axios**: 외부 API 통신
- **form-data**: 멀티파트 폼 데이터 생성
- **nodemon**: 개발용 자동 재시작
- **jest**: 테스트 프레임워크
- **eslint/prettier**: 코드 스타일 및 린팅
- **helmet/cors/morgan**: 보안 및 로깅

---

## 세부 내용

### 데이터 모델

#### Video

- `globalOrder`: 고유 순서 (Number, unique)
- `videoId`: 비디오 식별자 (String)
- `startTime`, `endTime`: 구간 정보 (Number, 초 단위)
- `script`: 스크립트(자막) (String)
- `createdAt`, `updatedAt`: 생성/수정 시각

#### RefAudio

- `globalOrder`: 참조 오디오 순서 (Number)
- `audio_path`: 오디오 파일 경로 (String)
- `createdAt`, `updatedAt`: 생성/수정 시각

### API 세부사항

#### 1. 콘텐츠 관리

- **GET** `/content/:contentId`  
  특정 globalOrder의 비디오 정보 조회

- **POST** `/content`  
  비디오 정보 등록  
  요청 예시:
  ```json
  {
    "videoId": "video123",
    "startTime": 0,
    "endTime": 10,
    "script": "스크립트 내용",
    "globalOrder": 1
  }
  ```

#### 2. 파일 업로드 및 분석

- **POST** `/upload`  
  사용자 음성 파일 업로드 및 참조 오디오와 비교 분석
  - Content-Type: `multipart/form-data`
  - 파라미터:
    - `user_audio`: 사용자 음성 파일 (WAV, MP3, MPEG)
    - `globalOrder`: 참조 오디오 순서
  - 제한: 최대 20MB

#### 3. 에러 처리

- 모든 API는 아래와 같은 형식으로 에러 반환:
  ```json
  {
    "success": false,
    "message": "에러 메시지"
  }
  ```
- 주요 에러 코드: 400, 404, 409, 500

---

## 사용방법

### 1. 설치 및 실행

```bash
npm install
npm start
```

### 2. 환경 변수

- `config/database.js`에서 MongoDB 연결 정보 설정

### 3. API 테스트

- Postman, curl 등으로 위 API 엔드포인트 호출

---

## 라이선스

MIT License
