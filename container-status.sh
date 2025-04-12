#!/bin/bash

echo "Checking Jira CSV Quality Analyzer container status..."
echo

# Check backend container
echo "Backend container:"
docker ps -a --filter name=jira-analyzer-backend --format "Status: {{.Status}}"
echo

# Check frontend container
echo "Frontend container:"
docker ps -a --filter name=jira-analyzer-frontend --format "Status: {{.Status}}"
echo

# Show container stats if running
echo "Container resources usage:"
docker stats --no-stream jira-analyzer-backend jira-analyzer-frontend
