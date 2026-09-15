#!/usr/bin/env bash
set -e
npm install
if [ ! -d android ]; then npx cap add android; fi
if [ "$(uname -s)" = "Darwin" ] && [ ! -d ios ]; then npx cap add ios; fi
npx cap sync
printf '\nNative platforms are ready.\n'
