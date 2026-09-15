# 양평동교회 회계 V6

## 목표
Android / iPhone / PC(PWA)에서 동일한 교회 회계를 공동관리할 수 있도록 V5를 V6로 확장한 프로젝트입니다.

## V6 핵심
- Firebase Authentication 기반 회계담당자 로그인 준비
- Cloud Firestore 공동장부 동기화(설정/관·항·목/거래)
- Cloud Storage 영수증 저장을 위한 보안 규칙 포함
- 역할: 관리자 / 위원장 / 부장 / 회계 / 열람자
- 결재: 작성 → 결재대기 → 부장승인 → 위원장승인 → 결재완료
- 회계기간 잠금 및 감사기록
- 기존 V5/V4 장부 구조 유지
- Android / iPhone / PWA 공통 코드

## 반드시 알아둘 점
이 패키지는 **Firebase 프로젝트 ID와 계정이 아직 없는 상태에서도 실행되는 클라우드 연결 준비형**입니다. 실제 공동사용을 시작하려면 교회 명의의 Firebase 프로젝트를 생성하고 Web App 설정값을 `www/firebase-config.js`에 입력해야 합니다.

Firebase Authentication + Firestore Security Rules를 함께 사용해야 역할별 권한을 서버에서 강제할 수 있습니다. Firestore는 Android/Apple/Web에서 오프라인 캐시와 온라인 복구 동기화를 지원합니다.

## Firebase 연결 순서
1. Firebase Console에서 프로젝트 생성
2. Authentication → Email/Password 활성화
3. Firestore Database 생성
4. Storage 생성
5. Web App 추가 후 설정값을 `www/firebase-config.js`에 입력
6. `firestore.rules`, `storage.rules` 검토 후 배포
7. 관리자 사용자 생성
8. `users/{UID}` 문서에 `role: "관리자"` 등록
9. 회계 담당자/부장/위원장 사용자를 생성하고 각각 역할 지정
10. 앱의 [클라우드]에서 로그인 후 [현재 장부 업로드]

## Android / iPhone 빌드
Capacitor 프로젝트이므로 Android와 iOS를 각각 네이티브 프로젝트로 빌드합니다.

```bash
npm install
npx cap sync
npx cap open android
npx cap open ios
```

Android는 Android Studio, iPhone은 macOS + Xcode가 필요합니다.

## 보안
- Firestore/Storage 규칙은 로그인과 역할을 기준으로 접근을 제한합니다.
- 운영 전 Firebase Rules Simulator / Emulator Suite로 규칙을 반드시 테스트하십시오.
- 영수증 사진에는 개인정보가 포함될 수 있으므로 공개 링크 방식으로 저장하지 않습니다.
- 회계 결산 후에는 기간 잠금을 사용하고 로컬 백업도 보관하십시오.

## V6의 현재 한계
- 이 작업 환경에는 사용자의 Firebase 프로젝트 자격증명이 없으므로 실제 교회 계정과 실시간 DB를 임의로 생성하거나 연결할 수 없습니다.
- Firebase 설정을 넣기 전에는 V5처럼 로컬 장부로 사용할 수 있습니다.
- 최종 APK/IPA 서명본은 Android Studio/Xcode에서 교회 계정으로 빌드해야 합니다.
