# Frontend

고립·은둔 청년을 위한 AI 기반 단계적 사회복귀 지원 앱 CtrlZ의 프론트엔드입니다.

## 관련 레포
- [Backend](https://github.com/likelion-ctrlz/ctrlz-back)
- [AI](https://github.com/likelion-ctrlz/ctrlz-ai)

## 기술 스택
- React 19
- Tailwind CSS
- Vite
- 배포: Vercel

## 시작하기

### 1. 패키지 설치
```bash
npm install
```

### 2. 환경변수 설정
```bash
cp .env.example .env
```
`.env` 파일 열어서 값 채우기 (아래 환경변수 항목 참고)

### 3. 개발 서버 실행
```bash
npm run dev
```
앱 확인: http://localhost:5173

## 디렉토리 구조
```
src/
├── api/          # 백엔드 API 호출 함수 (예정)
├── components/   # 공용 컴포넌트 (Header, BottomTabBar 등)
├── pages/        # 라우트별 페이지
├── hooks/        # 커스텀 훅 (예정)
└── assets/       # 이미지, 폰트 등
```

## 환경변수
`.env.example` 참고. `.env` 파일은 절대 커밋하지 않습니다.

| 변수명 | 설명 | 예시 |
|---|---|---|
| `VITE_API_BASE_URL` | 백엔드 서버 주소 | `http://localhost:8000` |
| `VITE_KAKAO_CLIENT_ID` | 카카오 REST API 키 | 카카오 디벨로퍼스에서 발급 |
| `VITE_KAKAO_REDIRECT_URI` | 카카오 로그인 리다이렉트 URI | `http://localhost:5173/auth/kakao/callback` |
| `VITE_GOOGLE_CLIENT_ID` | 구글 OAuth 클라이언트 ID | 구글 클라우드 콘솔에서 발급 |

## 브랜치 · 커밋 규칙
- 브랜치: `feat/frontend/기능명` (예: `feat/frontend/mission-card`)
- 커밋: `[FE] feat: 미션 카드 컴포넌트 추가`
- 타입: `feat` | `fix` | `refactor` | `docs` | `chore`
- PR은 `dev` 브랜치로
