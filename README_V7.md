# 양평동교회 회계 V7

Android / iPhone / PWA용 공동회계 시스템 확장판입니다.

## V7 핵심
- Firebase Authentication 로그인
- Cloud Firestore 실시간 거래/계정/설정 동기화
- Cloud Storage 영수증 원본 보관
- 역할별 결재 흐름: 회계 → 부장 → 위원장 → 최종결재
- 회계연도 잠금
- 감사기록 기반 운영
- V7 관리자센터: 결재대기, 수입/지출, 부서별 지출, 백업/CSV, 영수증 클라우드 보관
- Android / iPhone / PWA 동일 코드베이스

## 실제 운영 전 필수 설정
1. Firebase 프로젝트 생성
2. Authentication에서 이메일/비밀번호 활성화
3. Firestore Database 생성
4. Storage 생성
5. `firebase-config.example.js`를 참고하여 `firebase-config.js` 작성
6. `firestore.rules`, `storage.rules` 배포
7. 사용자 역할 문서를 Firestore에 등록
8. Android/iOS 앱 빌드 및 서명

## 보안 주의
클라이언트 화면의 역할 선택만으로 권한을 보호하면 안 됩니다. 실제 운영에서는 Firebase Authentication + Firestore/Storage Security Rules에서 역할을 강제해야 합니다.

## 빌드
- `npm install`
- `npm run sync`
- Android: `npm run android`
- iOS: `npm run ios` (macOS + Xcode 필요)
- PWA: `www/`를 HTTPS 웹호스팅에 배포

이 프로젝트에는 서명된 최종 APK/IPA가 포함되어 있지 않습니다. 빌드 환경과 Apple/Google 개발자 계정에서 서명해야 합니다.
