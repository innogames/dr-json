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
zip -j dist/upload/Dr.Json-${PACKAGE_VERSION}-mac.zip "dist/Dr. Json-${PACKAGE_VERSION}.dmg"
zip -j dist/upload/Dr.Json-${PACKAGE_VERSION}-arm64.zip "dist/Dr. Json-${PACKAGE_VERSION}-arm64.dmg"
zip -j dist/upload/Dr.Json-${PACKAGE_VERSION}-windows.zip "dist/Dr. Json ${PACKAGE_VERSION}.exe"