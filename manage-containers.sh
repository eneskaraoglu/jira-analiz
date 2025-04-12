#!/bin/bash

clear
echo "Jira CSV Quality Analyzer - Container Management"

# Make sure scripts are executable
chmod +x build-images.sh run-containers.sh start-containers.sh stop-containers.sh container-status.sh

show_menu() {
    echo
    echo "---------------------------------------------"
    echo "           CONTAINER MANAGEMENT"
    echo "---------------------------------------------"
    echo "  1. Build Docker images"
    echo "  2. Create and run containers"
    echo "  3. Start existing containers"
    echo "  4. Stop containers"
    echo "  5. Check container status"
    echo "  6. View container logs"
    echo "  7. Remove all containers and images"
    echo "  8. Exit"
    echo "---------------------------------------------"
    echo
}

while true; do
    show_menu
    read -p "Enter your choice (1-8): " choice
    
    case $choice in
        1)
            echo
            echo "Building Docker images..."
            ./build-images.sh
            read -p "Press Enter to continue..." dummy
            clear
            ;;
        2)
            echo
            echo "Creating and running containers..."
            ./run-containers.sh
            read -p "Press Enter to continue..." dummy
            clear
            ;;
        3)
            echo
            echo "Starting existing containers..."
            ./start-containers.sh
            read -p "Press Enter to continue..." dummy
            clear
            ;;
        4)
            echo
            echo "Stopping containers..."
            ./stop-containers.sh
            read -p "Press Enter to continue..." dummy
            clear
            ;;
        5)
            echo
            echo "Checking container status..."
            ./container-status.sh
            read -p "Press Enter to continue..." dummy
            clear
            ;;
        6)
            while true; do
                echo
                echo "Which container logs do you want to view?"
                echo "  1. Backend"
                echo "  2. Frontend"
                echo "  3. Both"
                echo "  4. Return to main menu"
                read -p "Enter your choice (1-4): " log_choice
                
                case $log_choice in
                    1)
                        echo
                        echo "Viewing backend logs (press Ctrl+C to exit)..."
                        docker logs -f jira-analyzer-backend
                        ;;
                    2)
                        echo
                        echo "Viewing frontend logs (press Ctrl+C to exit)..."
                        docker logs -f jira-analyzer-frontend
                        ;;
                    3)
                        echo
                        echo "Viewing all logs (press Ctrl+C to exit)..."
                        docker logs -f jira-analyzer-backend jira-analyzer-frontend
                        ;;
                    4)
                        clear
                        break
                        ;;
                    *)
                        echo "Invalid choice, please try again."
                        ;;
                esac
            done
            ;;
        7)
            echo
            echo "WARNING: This will remove all Jira Analyzer containers and images."
            read -p "Are you sure you want to continue? (y/n): " confirm
            if [[ $confirm == [Yy]* ]]; then
                echo
                echo "Removing containers and images..."
                docker rm -f jira-analyzer-backend jira-analyzer-frontend 2>/dev/null
                docker rmi jira-analyzer-backend:latest jira-analyzer-frontend:latest 2>/dev/null
                echo "Done!"
                read -p "Press Enter to continue..." dummy
            fi
            clear
            ;;
        8)
            echo
            echo "Exiting container management..."
            exit 0
            ;;
        *)
            echo "Invalid choice, please try again."
            read -p "Press Enter to continue..." dummy
            clear
            ;;
    esac
done
