# 양평동교회 회계 V5

Android · iPhone · PWA 통합형 교회 공동회계 관리 프로젝트입니다.

## V5 핵심 발전
- V4 회계 구조 승계
- 사용자 역할: 관리자 / 위원장 / 부장 / 회계 / 열람자
- 결재 흐름: 작성 → 결재대기 → 부장승인 → 위원장승인 → 결재완료
- 회계기간 잠금
- 감사기록(Audit Log): 등록·수정·권한·결재·잠금 작업 기록
- 공동관리 대시보드
- 클라우드 동기화 연결 준비: Firebase 또는 사용자 서버(API)
- Android / iPhone / 웹(PWA) 공통 UI
- 기존 영수증·예산·장부·결산·백업 기능 유지

## 중요한 운영 원칙
현재 프로젝트는 **로컬 회계 + 공동관리 UI + 클라우드 연결 준비**까지 구현되어 있습니다.
실제 여러 사람이 동시에 같은 장부를 사용하려면 교회 전용 서버 또는 Firebase 프로젝트가 필요합니다. Firebase Authentication은 사용자 인증을, Cloud Firestore는 모바일/웹의 실시간 동기화와 오프라인 지원을 제공할 수 있고, Security Rules로 사용자별 접근을 제한할 수 있습니다.

공식 문서:
- Capacitor: https://capacitorjs.com/docs
- Firebase Authentication: https://firebase.google.com/docs/auth/
- Cloud Firestore: https://firebase.google.com/docs/firestore
- Firestore Security Rules: https://firebase.google.com/docs/firestore/security/overview

## 실제 공동사용 권장 구조
1. Firebase 프로젝트 생성
2. Authentication에서 사용자 계정 생성
3. Firestore에 교회/회계연도/부서/거래/영수증/결재 컬렉션 구성
4. Security Rules에서 관리자·위원장·부장·회계·열람자 권한 설정
5. 영수증은 Cloud Storage에 저장하고 Firestore에는 메타데이터 저장
6. App Check 적용
7. Android/iOS 앱에서 동일한 프로젝트를 사용

## APK / iOS
이 작업 환경에는 Android SDK/Gradle과 macOS/Xcode가 없어 최종 서명 APK/IPA는 생성하지 않았습니다. 프로젝트는 기존 V4의 Android/iOS 구조를 유지합니다.

## V5 데이터 보안 주의
현재 로컬 데이터는 브라우저/앱 내부 저장소에 있습니다. 실사용 전 반드시 정기 백업을 하고, 실제 교회 공동회계 운영에서는 서버 인증·보안규칙·백업정책을 적용해야 합니다.
