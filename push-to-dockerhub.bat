@echo off
echo Pushing Jira CSV Quality Analyzer images to Docker Hub

REM Check if already logged in
docker info | findstr Username >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Please log in to Docker Hub
    docker login
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to log in to Docker Hub
        exit /b 1
    )
)

REM Get Docker Hub username
for /f "tokens=2" %%a in ('docker info ^| findstr Username') do set DOCKER_USER=%%a
echo Using Docker Hub username: %DOCKER_USER%

REM Check if specified username should be used instead
set SPECIFIED_USER=eneskaraoglu
set /p CONFIRM_USER=Use "%SPECIFIED_USER%" instead of "%DOCKER_USER%"? (y/n): 
if /i "%CONFIRM_USER%"=="y" (
    set DOCKER_USER=%SPECIFIED_USER%
    echo Using specified username: %DOCKER_USER%
)

REM Check if images exist
docker image inspect jira-analyzer-backend:latest >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Backend image not found. Please run build-images.bat first.
    exit /b 1
)

docker image inspect jira-analyzer-frontend:latest >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Frontend image not found. Please run build-images.bat first.
    exit /b 1
)

REM Tag images with Docker Hub username
echo Tagging images...
docker tag jira-analyzer-backend:latest %DOCKER_USER%/jira-analyzer-backend:latest
docker tag jira-analyzer-frontend:latest %DOCKER_USER%/jira-analyzer-frontend:latest

REM Push images to Docker Hub
echo Pushing backend image to Docker Hub...
docker push %DOCKER_USER%/jira-analyzer-backend:latest

echo Pushing frontend image to Docker Hub...
docker push %DOCKER_USER%/jira-analyzer-frontend:latest

echo.
echo Images successfully pushed to Docker Hub:
echo - %DOCKER_USER%/jira-analyzer-backend:latest
echo - %DOCKER_USER%/jira-analyzer-frontend:latest
echo.
echo You can pull these images on another machine using:
echo docker pull %DOCKER_USER%/jira-analyzer-backend:latest
echo docker pull %DOCKER_USER%/jira-analyzer-frontend:latest
