@echo off
echo Starting Jira CSV Quality Analyzer containers...

REM Check if containers exist
docker inspect jira-analyzer-backend >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Backend container doesn't exist. Please run run-containers.bat first.
    exit /b 1
)

docker inspect jira-analyzer-frontend >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Frontend container doesn't exist. Please run run-containers.bat first.
    exit /b 1
)

REM Start containers
echo Starting backend container...
docker start jira-analyzer-backend

echo Starting frontend container...
docker start jira-analyzer-frontend

echo.
echo Containers started successfully!
echo Backend is running at: http://localhost:5000
echo Frontend is running at: http://localhost
