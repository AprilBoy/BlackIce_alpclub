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

    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
}

# Build the application
build_app() {
    log_info "Building React application..."
    npm run build

    if [ $? -eq 0 ]; then
        log_info "Build completed successfully"
    else
        log_error "Build failed"
        exit 1
    fi
}

# Build Docker image
build_docker() {
    log_info "Building Docker image..."
    docker-compose build --no-cache

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
    docker-compose down || true

    # Remove old images (optional, uncomment if needed)
    # log_info "Removing old images..."
    # docker image prune -f

    # Start new containers
    log_info "Starting new containers..."
    docker-compose up -d

    if [ $? -eq 0 ]; then
        log_info "Deployment completed successfully"
        log_info "Application is running on http://localhost"
        log_info "Check logs with: docker-compose logs -f"
    else
        log_error "Deployment failed"
        exit 1
    fi
}

# Restart application
restart_app() {
    log_info "Restarting application..."
    docker-compose restart

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
    docker-compose down

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
    docker-compose logs -f
}

# Show status
show_status() {
    log_info "Application status:"
    docker-compose ps
}

# Clean up
cleanup() {
    log_warn "Cleaning up Docker resources..."
    docker-compose down --volumes --remove-orphans
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
        "deploy")
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
        *)
            echo "Usage: $0 [build|deploy|restart|stop|logs|status|cleanup]"
            echo ""
            echo "Commands:"
            echo "  build    - Build React app and Docker image"
            echo "  deploy   - Full deployment (build + deploy)"
            echo "  restart  - Restart running containers"
            echo "  stop     - Stop running containers"
            echo "  logs     - Show application logs"
            echo "  status   - Show container status"
            echo "  cleanup  - Clean up Docker resources"
            exit 1
            ;;
    esac
}

main "$@"
