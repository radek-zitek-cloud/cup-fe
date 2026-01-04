#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: ./scripts/bump_version.sh [major|minor|patch]"
  exit 1
fi

PART=$1
PKG_FILE="package.json"

# Extract version using grep and sed
VERSION=$(grep '"version":' $PKG_FILE | head -1 | awk -F: '{ print $2 }' | sed 's/[ ", ]//g')

if [ -z "$VERSION" ]; then
  echo "Error: Could not extract version from $PKG_FILE"
  exit 1
fi

# Split version into components
IFS='.' read -r major minor patch <<< "$VERSION"

case $PART in
  major)
    major=$((major + 1))
    minor=0
    patch=0
    ;;
  minor)
    minor=$((minor + 1))
    patch=0
    ;;
  patch)
    patch=$((patch + 1))
    ;;
  *)
    echo "Error: Invalid part '$PART'. Use major, minor, or patch."
    exit 1
    ;;
esac

NEW_VERSION="$major.$minor.$patch"

# Replace version in package.json
# Note: This specifically targets the first "version": "..." occurrence
sed -i "0,/\"version\": \"$VERSION\"/s/\"version\": \"$VERSION\"/\"version\": \"$NEW_VERSION\"/" $PKG_FILE

echo "$NEW_VERSION"
