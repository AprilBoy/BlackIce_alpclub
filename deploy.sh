#!/bin/bash

# BlackIce Alpclub Deployment Script
# Usage: ./deploy.sh [build|deploy|restart|stop]

set -e

PROJECT_NAME="blackice-app"
DOCKER_COMPOSE_FILE="docker-compose.yml"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    # Check for docker-compose (legacy) or docker compose (new)
    if command -v docker-compose &> /dev/null; then
        DOCKER_COMPOSE_CMD="docker-compose"
    elif docker compose version &> /dev/null; then
        DOCKER_COMPOSE_CMD="docker compose"
    else
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi

    log_info "Using Docker Compose command: $DOCKER_COMPOSE_CMD"
}

# Build the application (local build - optional, Docker build is preferred)
build_app() {
    log_info "Checking for Node.js and npm..."
    if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
        log_warn "Node.js or npm not found. Skipping local build (Docker build will handle this)."
        log_info "If you want to build locally, install Node.js and npm first."
        return 0
    fi

    log_info "Cleaning previous build..."
    rm -rf build

    log_info "Installing dependencies..."
    npm ci --include=dev

    log_info "Building React application locally..."
    npm run build

    if [ $? -eq 0 ]; then
        log_info "Local build completed successfully"
    else
        log_error "Local build failed"
        exit 1
    fi
}

# Build Docker image
build_docker() {
    log_info "Building Docker image..."
    $DOCKER_COMPOSE_CMD build --no-cache --pull --build-arg CACHE_BUST=$(date +%s)

    if [ $? -eq 0 ]; then
        log_info "Docker build completed successfully"
    else
        log_error "Docker build failed"
        exit 1
    fi
}

# Deploy application
deploy_app() {
    log_info "Starting deployment..."

    # Stop existing containers
    log_info "Stopping existing containers..."
    $DOCKER_COMPOSE_CMD down || true

    # Remove old images (optional, uncomment if needed)
    # log_info "Removing old images..."
    # docker image prune -f

    # Start new containers
    log_info "Starting new containers..."
    $DOCKER_COMPOSE_CMD up -d

    if [ $? -eq 0 ]; then
        log_info "Deployment completed successfully"
        log_info "Application is running on http://localhost"
        log_info "Check logs with: $DOCKER_COMPOSE_CMD logs -f"
    else
        log_error "Deployment failed"
        exit 1
    fi
}

# Restart application
restart_app() {
    log_info "Restarting application..."
    $DOCKER_COMPOSE_CMD restart

    if [ $? -eq 0 ]; then
        log_info "Application restarted successfully"
    else
        log_error "Restart failed"
        exit 1
    fi
}

# Stop application
stop_app() {
    log_info "Stopping application..."
    $DOCKER_COMPOSE_CMD down

    if [ $? -eq 0 ]; then
        log_info "Application stopped successfully"
    else
        log_error "Stop failed"
        exit 1
    fi
}

# Show logs
show_logs() {
    log_info "Showing application logs..."
    $DOCKER_COMPOSE_CMD logs -f
}

# Show status
show_status() {
    log_info "Application status:"
    $DOCKER_COMPOSE_CMD ps
}

# Clean up
cleanup() {
    log_warn "Cleaning up Docker resources..."
    $DOCKER_COMPOSE_CMD down --volumes --remove-orphans
    docker system prune -f
    log_info "Cleanup completed"
}

# Main script
main() {
    check_docker

    case "${1:-deploy}" in
        "build")
            build_app
            build_docker
            ;;
        "build-local")
            build_app
            ;;
        "build-docker")
            build_docker
            ;;
        "deploy")
            build_docker
            deploy_app
            ;;
        "deploy-full")
            build_app
            build_docker
            deploy_app
            ;;
        "restart")
            restart_app
            ;;
        "stop")
            stop_app
            ;;
        "logs")
            show_logs
            ;;
        "status")
            show_status
            ;;
        "cleanup")
            cleanup
            ;;
        "test-build")
            log_info "Testing Docker build..."
            docker build --no-cache --build-arg CACHE_BUST=$(date +%s) -t blackice-test .
            ;;
        "debug-build")
            log_info "Testing Docker build with debug Dockerfile..."
            docker build --no-cache --build-arg CACHE_BUST=$(date +%s) -f Dockerfile.debug -t blackice-debug .
            log_info "Debug container built. Run with: docker run -it blackice-debug"
            ;;
        *)
            echo "Usage: $0 [build|build-local|build-docker|deploy|deploy-full|restart|stop|logs|status|cleanup|test-build|debug-build]"
            echo ""
            echo "Commands:"
            echo "  build          - Build React app locally + Docker image"
            echo "  build-local    - Build React app locally only"
            echo "  build-docker   - Build Docker image only"
            echo "  deploy         - Full deployment with Docker build (recommended)"
            echo "  deploy-full    - Full deployment with local + Docker build"
            echo "  restart        - Restart running containers"
            echo "  stop           - Stop running containers"
            echo "  logs           - Show application logs"
            echo "  status         - Show container status"
            echo "  test-build     - Test Docker build without deployment"
            echo "  debug-build    - Test build with debug Dockerfile for troubleshooting"
            echo "  cleanup        - Clean up Docker resources"
            exit 1
            ;;
    esac
}

main "$@"
