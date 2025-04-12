@echo off
echo Building and deploying Jira CSV Quality Analyzer with Docker...

REM Check if Docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Docker is not installed. Please install Docker first.
    exit /b 1
)

REM Check if Docker Compose is installed
where docker-compose >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Docker Compose is not installed. Please install Docker Compose first.
    exit /b 1
)

REM Build and start the containers
echo Building and starting containers...
docker-compose up --build -d

REM Check if containers are running
echo Checking containers status...
docker-compose ps

echo Deployment complete! Your application should be available at:
echo - Frontend: http://localhost
echo - Backend API: http://localhost:5000