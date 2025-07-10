# Docker Setup for AnyList

This directory contains Docker configuration for the AnyList project, providing both development and production environments.

## Quick Start

### Development Environment

```bash
# Build and start development container
docker compose up --build

# Or run in background
docker compose up -d --build

# Stop the development container
docker compose down
```

### Production Environment

```bash
# Build and start production container
docker compose --profile production up --build anylist-prod

# Or run in background
docker compose --profile production up -d --build anylist-prod
```

## Docker Configuration

### Dockerfile Features

- **Multi-stage build**: Separate development and production stages
- **Node.js Alpine base**: Lightweight and secure base image
- **Non-root user**: Runs as `anylist` user (UID 1001) for security
- **Layer optimization**: Efficient caching for faster rebuilds
- **Health checks**: Basic health monitoring

### Development Container

- **Hot reloading**: Source code mounted as volume
- **All dependencies**: Includes development dependencies
- **Interactive terminal**: TTY and stdin enabled
- **Port forwarding**: Port 3000 exposed for future web interface

### Production Container

- **Minimal footprint**: Only production dependencies
- **Optimized layers**: Smaller final image size
- **Security hardened**: Non-root user, minimal attack surface

## VS Code Development Container

A `.devcontainer` configuration is provided for VS Code development:

1. Install the "Dev Containers" extension in VS Code
2. Open the project in VS Code
3. VS Code will prompt to "Reopen in Container"
4. The development environment will be automatically set up

### Development Container Features

- Pre-configured Node.js environment
- ESLint and Prettier integration
- Useful VS Code extensions pre-installed
- Git integration
- Port forwarding for development server

## Available Scripts in Container

```bash
# Lint the code
npm test

# Fix linting issues
npm run lint-fix

# Generate documentation
npm run document
```

## TypeScript Readiness

This Docker configuration is designed to support the planned TypeScript conversion:

- Node.js 18 environment ready for TypeScript
- VS Code extensions for TypeScript development
- Build process extensible for TypeScript compilation
- Multi-stage builds ready for TypeScript build step

## Health Checks

Both development and production containers include health checks:

- **Check command**: `node --version`
- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3
- **Start period**: 5 seconds

## Networking

- **Network**: `anylist-network` (bridge driver)
- **Development port**: 3000 (forwarded to host)
- **Production**: No exposed ports by default

## Volume Management

- **Development**: Source code mounted for hot reloading
- **Node modules**: Separate volume for faster performance
- **Persistent data**: `anylist-data` volume available for future use

## Troubleshooting

### Container won't start
```bash
# Check logs
docker compose logs anylist

# Rebuild from scratch
docker compose down
docker system prune -f
docker compose up --build
```

### Permission issues
The container runs as non-root user `anylist` (UID 1001). Ensure your host files have appropriate permissions.

### Development container missing dependencies
```bash
# Rebuild development container
docker compose down
docker compose up --build
```