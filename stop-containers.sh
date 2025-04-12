#!/bin/bash

echo "Stopping Jira CSV Quality Analyzer containers..."

# Stop containers if they exist
if docker inspect jira-analyzer-backend &>/dev/null; then
    echo "Stopping backend container..."
    docker stop jira-analyzer-backend
else
    echo "Backend container doesn't exist."
fi

if docker inspect jira-analyzer-frontend &>/dev/null; then
    echo "Stopping frontend container..."
    docker stop jira-analyzer-frontend
else
    echo "Frontend container doesn't exist."
fi

echo
echo "Containers stopped successfully!"
