#!/bin/bash

echo "Pushing Jira CSV Quality Analyzer images to Docker Hub"

# Check if already logged in
if ! docker info | grep -q Username; then
    echo "Please log in to Docker Hub"
    docker login
    if [ $? -ne 0 ]; then
        echo "Failed to log in to Docker Hub"
        exit 1
    fi
fi

# Get Docker Hub username
DOCKER_USER=$(docker info | grep Username | awk '{print $2}')
echo "Using Docker Hub username: $DOCKER_USER"

# Check if specified username should be used instead
SPECIFIED_USER="eneskaraoglu"
read -p "Use \"$SPECIFIED_USER\" instead of \"$DOCKER_USER\"? (y/n): " CONFIRM_USER
if [[ $CONFIRM_USER == [Yy]* ]]; then
    DOCKER_USER=$SPECIFIED_USER
    echo "Using specified username: $DOCKER_USER"
fi

# Check if images exist
if ! docker image inspect jira-analyzer-backend:latest &>/dev/null; then
    echo "Backend image not found. Please run build-images.sh first."
    exit 1
fi

if ! docker image inspect jira-analyzer-frontend:latest &>/dev/null; then
    echo "Frontend image not found. Please run build-images.sh first."
    exit 1
fi

# Tag images with Docker Hub username
echo "Tagging images..."
docker tag jira-analyzer-backend:latest $DOCKER_USER/jira-analyzer-backend:latest
docker tag jira-analyzer-frontend:latest $DOCKER_USER/jira-analyzer-frontend:latest

# Push images to Docker Hub
echo "Pushing backend image to Docker Hub..."
docker push $DOCKER_USER/jira-analyzer-backend:latest

echo "Pushing frontend image to Docker Hub..."
docker push $DOCKER_USER/jira-analyzer-frontend:latest

echo
echo "Images successfully pushed to Docker Hub:"
echo "- $DOCKER_USER/jira-analyzer-backend:latest"
echo "- $DOCKER_USER/jira-analyzer-frontend:latest"
echo
echo "You can pull these images on another machine using:"
echo "docker pull $DOCKER_USER/jira-analyzer-backend:latest"
echo "docker pull $DOCKER_USER/jira-analyzer-frontend:latest"
