$ErrorActionPreference = 'Stop'
npm install
if (-not (Test-Path android)) { npx cap add android }
npx cap sync
Write-Host "Android native project is ready. On macOS, run: npx cap add ios && npx cap sync ios"
