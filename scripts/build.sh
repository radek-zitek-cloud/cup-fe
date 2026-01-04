#!/bin/bash
set -e

# Extract version from package.json
VERSION=$(grep '"version":' package.json | head -1 | awk -F: '{ print $2 }' | sed 's/[", ]//g')

if [ -z "$VERSION" ]; then
  echo "Error: Could not extract version from package.json"
  exit 1
fi

echo "Building Docker image for version: $VERSION"

# Build with specific tag
TAG=$VERSION docker compose build frontend

# Also tag as latest
TAG=latest docker compose build frontend

echo "Successfully built cup-fe:$VERSION and cup-fe:latest"
