#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: ./scripts/release.sh [major|minor|patch]"
  exit 1
fi

BUMP_TYPE=$1

# Ensure working directory is clean
if [ -n "$(git status --porcelain)" ]; then
  echo "Error: Working directory is not clean. Commit or stash changes first."
  exit 1
fi

echo "Bumping $BUMP_TYPE version..."
NEW_VERSION=$(./scripts/bump_version.sh "$BUMP_TYPE")

if [ -z "$NEW_VERSION" ]; then
    echo "Error: Failed to bump version."
    exit 1
fi

echo "New version: $NEW_VERSION"

# Run tests
echo "Running tests..."
npm run test

# Run build to ensure everything is fine
echo "Running build check..."
npm run build

# Commit change
echo "Committing version bump..."
git add package.json
# If package-lock.json exists, add it too
if [ -f package-lock.json ]; then
  git add package-lock.json
fi
git commit -m "Bump version to $NEW_VERSION"

# Tag
TAG="v$NEW_VERSION"
echo "Tagging $TAG..."
git tag -a "$TAG" -m "Release $TAG"

# Push
echo "Pushing changes and tag..."
git push origin main
git push origin "$TAG"

# Create GitHub Release
echo "Creating GitHub Release..."
if command -v gh &> /dev/null; then
    gh release create "$TAG" --generate-notes
else
    echo "gh CLI not found, skipping GitHub release creation."
fi

echo "Release $TAG created successfully!"
