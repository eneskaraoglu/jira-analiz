#!/bin/bash

echo "Building Docker images for Jira CSV Quality Analyzer..."

# Build backend image
echo
echo "Building backend image..."
cd backend
docker build -t jira-analyzer-backend:latest .
cd ..

# Build frontend image
echo
echo "Building frontend image..."
cd frontend
docker build -t jira-analyzer-frontend:latest .
cd ..

echo
echo "Images built successfully!"
echo "Backend image: jira-analyzer-backend:latest"
echo "Frontend image: jira-analyzer-frontend:latest"
