# SRT (Speech Recognition Trainer)

음성 인식 학습을 위한 API 서버입니다. 사용자의 음성을 참조 오디오와 비교하여 분석 결과를 제공합니다.

## 기술 스택

- Node.js
- Express
- MongoDB (Mongoose)
- Multer (파일 업로드)

## 시작하기

### 설치

```bash
npm install
```

### 환경 변수 설정

config/database.js 파일에서 MongoDB 연결 정보를 설정하세요.

### 서버 실행

```bash
npm start
```

## API 문서

### 1. 콘텐츠 관리 API

#### 콘텐츠 조회

- **GET** `/content/:contentId`
- **설명**: 특정 ID의 비디오 콘텐츠 정보를 조회합니다.
- **URL 파라미터**:
  - `contentId`: 콘텐츠의 globalOrder
- **응답**:
  ```json
  {
    "success": true,
    "message": "Content Resource Retrieved Successfully",
    "resource": {
      "globalOrder": 1,
      "videoId": "video123",
      "startTime": 0,
      "endTime": 10,
      "script": "스크립트 내용"
    }
  }
  ```

#### 비디오 콘텐츠 생성

- **POST** `/content`
- **설명**: 새로운 비디오 콘텐츠 정보를 생성합니다.
- **요청 본문**:
  ```json
  {
    "videoId": "video123",
    "startTime": 0,
    "endTime": 10,
    "script": "스크립트 내용",
    "globalOrder": 1
  }
  ```
- **응답**:
  ```json
  {
    "message": "비디오 저장 성공",
    "data": {
      "videoId": "video123",
      "startTime": 0,
      "endTime": 10,
      "script": "스크립트 내용",
      "globalOrder": 1
    }
  }
  ```

### 2. 파일 업로드 API

#### 음성 파일 업로드 및 분석

- **POST** `/upload`
- **설명**: 사용자의 음성 파일을 업로드하고 참조 오디오와 비교 분석합니다.
- **Content-Type**: `multipart/form-data`
- **요청 파라미터**:
  - `user_audio`: 사용자 음성 파일 (WAV, MP3)
  - `globalOrder`: 참조 오디오의 순서 번호
- **제한사항**:
  - 최대 파일 크기: 20MB
  - 지원 형식: WAV, MP3, MPEG
- **응답**:
  ```json
  {
    "success": true,
    "message": "Post file success",
    "data": {
      "분석_결과": "데이터"
    }
  }
  ```

## 에러 처리

모든 API는 다음과 같은 형식으로 에러를 반환합니다:

```json
{
  "success": false,
  "message": "에러 메시지"
}
```

주요 에러 코드:

- 400: 잘못된 요청 (필수 필드 누락 등)
- 404: 리소스를 찾을 수 없음
- 409: 중복된 데이터 (예: globalOrder)
- 500: 서버 내부 에러

## 데이터 모델

### Video 모델

```javascript
{
  globalOrder: Number,  // 고유한 순차적 순서
  videoId: String,     // 비디오 식별자
  startTime: Number,   // 시작 시간(초)
  endTime: Number,     // 종료 시간(초)
  script: String,      // 스크립트 내용
  createdAt: Date,     // 생성 시간
  updatedAt: Date      // 수정 시간
}
```

### RefAudio 모델

```javascript
{
  globalOrder: Number,  // 참조 오디오의 순서
  audio_path: String,  // 오디오 파일 경로
  createdAt: Date,     // 생성 시간
  updatedAt: Date      // 수정 시간
}
```

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
