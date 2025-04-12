@echo off
echo Stopping Jira CSV Quality Analyzer containers...

REM Stop containers if they exist
docker inspect jira-analyzer-backend >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Stopping backend container...
    docker stop jira-analyzer-backend
) else (
    echo Backend container doesn't exist.
)

docker inspect jira-analyzer-frontend >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Stopping frontend container...
    docker stop jira-analyzer-frontend
) else (
    echo Frontend container doesn't exist.
)

echo.
echo Containers stopped successfully!
