# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Add a timestamp to invalidate cache when needed
ARG CACHE_BUST
ENV CACHE_BUST=$CACHE_BUST

# Install all dependencies (including dev dependencies for building)
RUN npm install

# Verify react-scripts is available
RUN echo "Checking react-scripts..." && npx react-scripts --version

# List installed packages to verify react-scripts
RUN npm list react-scripts

# Copy source code
COPY . .

# Build the application
RUN echo "Starting build..." && npm run build

# Production stage
FROM nginx:alpine

# Copy built application from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
