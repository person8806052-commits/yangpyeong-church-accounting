# 양평동교회 회계 V13

## 목표
V13는 V11의 회계·OCR·검증 기능을 유지하면서 휴대폰 설치와 운영을 명확히 준비한 버전입니다.

## 포함
- Android WebView 프로젝트
- iPhone/Capacitor 프로젝트 구조
- PWA
- 영수증 OCR
- 카카오톡 공유/영수증 가져오기 구조
- 회계 검증 및 실무관리
- 결산 잠금
- V13 전용 localStorage 키 및 기존 버전 자동 마이그레이션
- GitHub Actions에서 Android Debug APK를 자동 빌드하는 workflow

## 정직한 제한
이 파일에는 서명된 APK/IPA가 포함되어 있지 않습니다. 이 실행환경에는 Android SDK/Build Tools와 macOS/Xcode가 없어 최종 바이너리와 Apple 서명을 생성할 수 없습니다.

### Android APK
GitHub 저장소에 업로드한 뒤 Actions → Build Android APK를 실행하면 Debug APK artifact를 받을 수 있도록 workflow를 포함했습니다. 배포용 Release APK는 별도 서명키 설정이 필요합니다.

### iPhone
macOS/Xcode에서 Capacitor iOS 프로젝트를 생성/동기화하고 Apple 개발자 계정으로 서명해야 합니다.

### PWA
www 폴더를 HTTPS 웹서버에 배포하면 Android/iPhone 브라우저에서 홈 화면 추가 방식으로 사용할 수 있습니다.

## 주의
현재 회계 데이터는 기본적으로 기기 로컬 저장입니다. 여러 사람이 같은 장부를 동시에 사용하는 실시간 공동회계는 Firebase 프로젝트와 보안규칙을 실제 교회 계정으로 연결하고 충분히 테스트한 뒤 운영해야 합니다.
