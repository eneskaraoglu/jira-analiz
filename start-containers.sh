#!/bin/bash

echo "Starting Jira CSV Quality Analyzer containers..."

# Check if containers exist
if ! docker inspect jira-analyzer-backend &>/dev/null; then
    echo "Backend container doesn't exist. Please run run-containers.sh first."
    exit 1
fi

if ! docker inspect jira-analyzer-frontend &>/dev/null; then
    echo "Frontend container doesn't exist. Please run run-containers.sh first."
    exit 1
fi

# Start containers
echo "Starting backend container..."
docker start jira-analyzer-backend

echo "Starting frontend container..."
docker start jira-analyzer-frontend

echo
echo "Containers started successfully!"
echo "Backend is running at: http://localhost:5000"
echo "Frontend is running at: http://localhost"
