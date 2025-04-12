#!/bin/bash

echo "Building and deploying Jira CSV Quality Analyzer with Docker..."

# Make sure Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Build and start the containers
echo "Building and starting containers..."
docker-compose up --build -d

# Check if containers are running
echo "Checking containers status..."
docker-compose ps

echo "Deployment complete! Your application should be available at:"
echo "- Frontend: http://localhost"
echo "- Backend API: http://localhost:5000"