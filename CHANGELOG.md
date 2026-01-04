# Changelog

All notable changes to this project will be documented in this file.

## [0.1.2] - 2026-01-04

### Fixed
- Resolved Docker build warnings by using consistent casing for `AS`.
- Fixed `make docs` by expanding entry point strategy.
- Resolved all remaining TypeScript and Linting issues.

## [0.1.1] - 2026-01-04

### Added
- Integrated **Vitest** and **React Testing Library**.
- Added initial unit tests for components and pages.
- Added `make lint` and `make format` targets.
- Implemented **Runtime Configuration** for `VITE_API_URL`.
- Renamed Docker image to `cup-fe`.

### Changed
- Migrated `bump_version.py` to `bump_version.sh` (shell-only).
- Updated frontend models and endpoints to match exact backend implementation.

## [0.1.0] - 2026-01-04

### Added
- Initial skeleton React + TypeScript + Vite project.
- Authentication flow: Signup, Login, Logout.
- Profile management: View profile, Update profile, Change password.
- Multi-stage Docker deployment with Nginx.
- Comprehensive `Makefile` for project management.
- TypeDoc for API documentation.
