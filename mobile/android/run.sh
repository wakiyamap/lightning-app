#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n engineering.lightning.Lightning/host.exp.exponent.MainActivity
