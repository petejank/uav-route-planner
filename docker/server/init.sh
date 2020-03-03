#!/bin/sh
cd "$(dirname "$0")"
screen -dmS app ./gradlew bootRun
tail -f /dev/null
