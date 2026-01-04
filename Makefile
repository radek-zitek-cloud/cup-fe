.PHONY: help up down restart logs build install dev build-prod docs bump-patch bump-minor bump-major release-patch release-minor release-major git-status git-push

# Default target
help:
	@echo "Available commands:"
	@echo "  Docker:"
	@echo "    make up              - Start containers in detached mode"
	@echo "    make down            - Stop and remove containers"
	@echo "    make restart         - Restart containers"
	@echo "    make logs            - Follow container logs"
	@echo "    make build           - Build Docker images"
	@echo ""
	@echo "  Local Development:"
	@echo "    make install         - Install dependencies"
	@echo "    make dev             - Run local development server"
	@echo "    make build-prod      - Build for production"
	@echo ""
	@echo "  Documentation:"
	@echo "    make docs            - Generate API documentation"
	@echo ""
	@echo "  Version & Release:"
	@echo "    make bump-patch      - Bump patch version (0.0.X)"
	@echo "    make bump-minor      - Bump minor version (0.X.0)"
	@echo "    make bump-major      - Bump major version (X.0.0)"
	@echo "    make release-patch   - Create patch release (bump, build, commit, tag, push, gh release)"
	@echo "    make release-minor   - Create minor release"
	@echo "    make release-major   - Create major release"
	@echo ""
	@echo "  Git:"
	@echo "    make git-status      - Show git status"
	@echo "    make git-push        - Push changes to origin"

# Docker
up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

build:
	./scripts/build.sh

# Local Development
install:
	npm install

dev:
	npm run dev

build-prod:
	npm run build

# Documentation
docs:
	npm run docs

# Version & Release
bump-patch:
	python3 scripts/bump_version.py patch

bump-minor:
	python3 scripts/bump_version.py minor

bump-major:
	python3 scripts/bump_version.py major

release-patch:
	./scripts/release.sh patch

release-minor:
	./scripts/release.sh minor

release-major:
	./scripts/release.sh major

# Git
git-status:
	git status

git-push:
	git push
