# Multi-stage build following Docker best practices
# Base stage with Node.js Alpine
FROM node:18-alpine AS base

# Create app directory with non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S anylist -u 1001 -G nodejs

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json yarn.lock ./
RUN npm ci --only=production && npm cache clean --force

# Development stage
FROM base AS development

# Install all dependencies (including dev dependencies)
RUN npm ci && npm cache clean --force

# Copy source code
COPY --chown=anylist:nodejs . .

# Switch to non-root user
USER anylist

# Expose port for development server (if needed in future)
EXPOSE 3000

# Default command for development
CMD ["node", "lib/index.js"]

# Production stage
FROM base AS production

# Copy source code
COPY --chown=anylist:nodejs lib ./lib
COPY --chown=anylist:nodejs package*.json ./

# Switch to non-root user
USER anylist

# Health check (can be customized based on actual application needs)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node --version || exit 1

# Default command for production
CMD ["node", "lib/index.js"]