@echo off
echo Jira CSV Quality Analyzer - Container Management

:menu
echo.
echo ---------------------------------------------
echo           CONTAINER MANAGEMENT
echo ---------------------------------------------
echo  1. Build Docker images
echo  2. Create and run containers
echo  3. Start existing containers
echo  4. Stop containers
echo  5. Check container status
echo  6. View container logs
echo  7. Remove all containers and images
echo  8. Exit
echo ---------------------------------------------
echo.

set /p choice=Enter your choice (1-8): 

if "%choice%"=="1" goto build
if "%choice%"=="2" goto run
if "%choice%"=="3" goto start
if "%choice%"=="4" goto stop
if "%choice%"=="5" goto status
if "%choice%"=="6" goto logs
if "%choice%"=="7" goto remove
if "%choice%"=="8" goto exit

echo Invalid choice, please try again.
goto menu

:build
echo.
echo Building Docker images...
call build-images.bat
pause
goto menu

:run
echo.
echo Creating and running containers...
call run-containers.bat
pause
goto menu

:start
echo.
echo Starting existing containers...
call start-containers.bat
pause
goto menu

:stop
echo.
echo Stopping containers...
call stop-containers.bat
pause
goto menu

:status
echo.
echo Checking container status...
call container-status.bat
pause
goto menu

:logs
echo.
echo Which container logs do you want to view?
echo  1. Backend
echo  2. Frontend
echo  3. Both
echo  4. Return to main menu
set /p log_choice=Enter your choice (1-4): 

if "%log_choice%"=="1" (
    echo.
    echo Viewing backend logs (press Ctrl+C to exit)...
    docker logs -f jira-analyzer-backend
    goto logs
)
if "%log_choice%"=="2" (
    echo.
    echo Viewing frontend logs (press Ctrl+C to exit)...
    docker logs -f jira-analyzer-frontend
    goto logs
)
if "%log_choice%"=="3" (
    echo.
    echo Viewing all logs (press Ctrl+C to exit)...
    docker logs -f jira-analyzer-backend jira-analyzer-frontend
    goto logs
)
if "%log_choice%"=="4" goto menu

echo Invalid choice, please try again.
goto logs

:remove
echo.
echo WARNING: This will remove all Jira Analyzer containers and images.
set /p confirm=Are you sure you want to continue? (y/n): 
if /i not "%confirm%"=="y" goto menu

echo.
echo Removing containers and images...
docker rm -f jira-analyzer-backend jira-analyzer-frontend 2>nul
docker rmi jira-analyzer-backend:latest jira-analyzer-frontend:latest 2>nul
echo Done!
pause
goto menu

:exit
echo.
echo Exiting container management...
exit /b 0
