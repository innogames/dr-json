#!/bin/bash

function getPackageJsonVal {
    echo $(cat package.json \
      | grep $1 \
      | head -1 \
      | awk -F: '{ print $2 }' \
      | sed 's/ *"//' \
      | sed 's/", *//')
}

DIR="$(dirname "$0")"
PACKAGE_VERSION=$(getPackageJsonVal version)
PRODUCT_NAME=$(getPackageJsonVal productName)

echo "Zip files..."
mkdir dist/upload

if [ -f "dist/Dr. Json-${PACKAGE_VERSION}.dmg" ]; then
  zip -j dist/upload/Dr.Json-mac.zip "dist/Dr. Json-${PACKAGE_VERSION}.dmg"
fi

if [ -f "dist/Dr. Json-${PACKAGE_VERSION}-arm64.dmg" ]; then
  zip -j dist/upload/Dr.Json-arm64.zip "dist/Dr. Json-${PACKAGE_VERSION}-arm64.dmg"
fi

if [ -f "dist/Dr. Json ${PACKAGE_VERSION}.exe" ]; then
  zip -j dist/upload/Dr.Json-windows.zip "dist/Dr. Json ${PACKAGE_VERSION}.exe"
fi
