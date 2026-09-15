양평동교회 회계 V13 — 실제 Android APK 빌드용 프로젝트

목표
- Android 휴대폰에서 설치 가능한 APK를 외부 빌드 환경에서 생성
- 앱 이름: 양평동교회 회계
- 버전: 13.0
- V12의 회계·OCR·영수증·검증 기능 유지

가장 쉬운 APK 생성 방법
1. 이 프로젝트를 GitHub 저장소에 업로드합니다.
2. Actions 메뉴에서 “Build Android APK (V13)”를 실행합니다.
3. 빌드가 끝나면 Artifacts에서 APK를 다운로드합니다.
4. Android 휴대폰에서 APK를 열어 설치합니다.

로컬 빌드
- Android Studio 또는 Android SDK
- JDK 17
- Android Gradle Plugin 8.13.x / Gradle 8.13
- compileSdk 35
- 명령: gradle assembleDebug

주의
- 이 작업 환경에는 Android SDK/Build Tools가 없어 APK 바이너리를 여기서 직접 컴파일할 수 없습니다.
- GitHub Actions에서는 Ubuntu + Android SDK를 사용해 실제 APK를 생성하도록 구성했습니다.
- debug APK는 테스트 설치용입니다. Play Store 배포에는 별도 서명키가 필요합니다.
