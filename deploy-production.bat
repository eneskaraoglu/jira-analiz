@echo off
echo Building and deploying Jira CSV Quality Analyzer for PRODUCTION...

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

REM Check for OpenAI API key in environment
if "%OPENAI_API_KEY%"=="" (
    echo Warning: No OPENAI_API_KEY environment variable found.
    echo The application will use the fallback scoring algorithm instead of AI.
    echo If you want to use AI-powered analysis, please set the OPENAI_API_KEY environment variable.
    echo.
) else (
    echo Using OpenAI API key from environment variable.
    REM We can't easily do in-place file editing in Windows batch, so we recommend manual editing
    echo Please uncomment and update the OPENAI_API_KEY line in docker-compose.prod.yml if you want to use AI.
)

REM Build and start the containers using the production configuration
echo Building and starting production containers...
docker-compose -f docker-compose.prod.yml up --build -d

REM Check if containers are running
echo Checking containers status...
docker-compose -f docker-compose.prod.yml ps

echo Production deployment complete! Your application should be available at:
echo - Frontend: http://localhost
echo - Backend API: http://localhost:5000
echo.
echo To monitor the application:
echo - View logs: docker-compose -f docker-compose.prod.yml logs -f
echo - Check health: docker inspect --format={{json .State.Health.Status}} jira-analyzer-backend jira-analyzer-frontend
echo.
echo To stop the application: docker-compose -f docker-compose.prod.yml down