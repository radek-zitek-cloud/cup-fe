# CUP Frontend

Skeleton React + TypeScript + Vite frontend for the CUP platform.

## Features

- **Authentication**: Signup, Login, and Logout.
- **User Management**: Profile viewing, updating (Full Name), and password changes.
- **Runtime Configuration**: API URL can be changed at runtime via environment variables in Docker.
- **Dockerized**: Multi-stage build with Nginx for production.
- **Testing**: Built-in Vitest and React Testing Library setup.
- **Developer Experience**: Comprehensive `Makefile` for all common tasks.

## Quick Start

### Local Development

1. Install dependencies:
   ```bash
   make install
   ```

2. Run development server:
   ```bash
   make dev
   ```

3. Run tests:
   ```bash
   make test
   ```

### Docker

1. Start the application:
   ```bash
   make up
   ```

2. The application will be available at `http://localhost:3000`.

## Available Commands

| Command | Description |
|---------|-------------|
| `make up` | Start Docker containers |
| `make down` | Stop Docker containers |
| `make build` | Build Docker images with version tags |
| `make test` | Run Vitest tests |
| `make lint` | Run ESLint with fixes |
| `make format` | Format code with Prettier |
| `make docs` | Generate API documentation |
| `make release-patch` | Bump version and create a release |

## Configuration

The frontend communicates with the backend via `VITE_API_URL`.
- In development: Set in `.env`.
- In Docker: Set via the `VITE_API_URL` environment variable.