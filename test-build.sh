#!/bin/bash

# Test build script for BlackIce Alpclub
# This script tests the Docker build process without deployment

set -e

IMAGE_NAME="blackice-test"
TIMESTAMP=$(date +%s)

echo "Testing Docker build for BlackIce Alpclub..."
echo "Timestamp: $TIMESTAMP"

# Build the image
docker build --no-cache --build-arg CACHE_BUST=$TIMESTAMP -t $IMAGE_NAME .

echo "Build completed successfully!"
echo ""
echo "To test the container locally, run:"
echo "docker run -p 8080:80 $IMAGE_NAME"
echo ""
echo "Then visit http://localhost:8080"
echo ""
echo "To clean up test image:"
echo "docker rmi $IMAGE_NAME"
