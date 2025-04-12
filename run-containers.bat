@echo off
echo Starting containers for Jira CSV Quality Analyzer...

REM Create network if it doesn't exist
docker network inspect jira-analyzer-network >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Creating Docker network: jira-analyzer-network
    docker network create jira-analyzer-network
)

REM Create volume for uploads if it doesn't exist
docker volume inspect jira-analyzer-uploads >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Creating Docker volume: jira-analyzer-uploads
    docker volume create jira-analyzer-uploads
)

REM Check if containers already exist
docker inspect jira-analyzer-backend >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Removing existing backend container...
    docker rm -f jira-analyzer-backend
)

docker inspect jira-analyzer-frontend >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Removing existing frontend container...
    docker rm -f jira-analyzer-frontend
)

REM Start backend container
echo Starting backend container...
docker run -d ^
    --name jira-analyzer-backend ^
    --network jira-analyzer-network ^
    -p 5000:5000 ^
    -v jira-analyzer-uploads:/usr/src/app/uploads ^
    -e NODE_ENV=production ^
    --restart unless-stopped ^
    jira-analyzer-backend:latest

REM Start frontend container
echo Starting frontend container...
docker run -d ^
    --name jira-analyzer-frontend ^
    --network jira-analyzer-network ^
    -p 80:80 ^
    --restart unless-stopped ^
    jira-analyzer-frontend:latest

echo.
echo Containers started successfully!
echo Backend is running at: http://localhost:5000
echo Frontend is running at: http://localhost
echo.
echo Use the following commands to manage containers:
echo - View logs: docker logs jira-analyzer-backend
echo - Stop containers: docker stop jira-analyzer-backend jira-analyzer-frontend
echo - Start containers: docker start jira-analyzer-backend jira-analyzer-frontend
