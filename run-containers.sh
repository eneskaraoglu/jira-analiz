#!/bin/bash

echo "Starting containers for Jira CSV Quality Analyzer..."

# Create network if it doesn't exist
if ! docker network inspect jira-analyzer-network &>/dev/null; then
    echo "Creating Docker network: jira-analyzer-network"
    docker network create jira-analyzer-network
fi

# Create volume for uploads if it doesn't exist
if ! docker volume inspect jira-analyzer-uploads &>/dev/null; then
    echo "Creating Docker volume: jira-analyzer-uploads"
    docker volume create jira-analyzer-uploads
fi

# Check if containers already exist
if docker inspect jira-analyzer-backend &>/dev/null; then
    echo "Removing existing backend container..."
    docker rm -f jira-analyzer-backend
fi

if docker inspect jira-analyzer-frontend &>/dev/null; then
    echo "Removing existing frontend container..."
    docker rm -f jira-analyzer-frontend
fi

# Start backend container
echo "Starting backend container..."
docker run -d \
    --name jira-analyzer-backend \
    --network jira-analyzer-network \
    -p 5000:5000 \
    -v jira-analyzer-uploads:/usr/src/app/uploads \
    -e NODE_ENV=production \
    --restart unless-stopped \
    jira-analyzer-backend:latest

# Start frontend container
echo "Starting frontend container..."
docker run -d \
    --name jira-analyzer-frontend \
    --network jira-analyzer-network \
    -p 80:80 \
    --restart unless-stopped \
    jira-analyzer-frontend:latest

echo
echo "Containers started successfully!"
echo "Backend is running at: http://localhost:5000"
echo "Frontend is running at: http://localhost"
echo
echo "Use the following commands to manage containers:"
echo "- View logs: docker logs jira-analyzer-backend"
echo "- Stop containers: docker stop jira-analyzer-backend jira-analyzer-frontend"
echo "- Start containers: docker start jira-analyzer-backend jira-analyzer-frontend"
