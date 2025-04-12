#!/bin/bash

echo "Building and deploying Jira CSV Quality Analyzer for PRODUCTION..."

# Make sure Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check for OpenAI API key in environment
if [ -z "$OPENAI_API_KEY" ]; then
    echo "Warning: No OPENAI_API_KEY environment variable found."
    echo "The application will use the fallback scoring algorithm instead of AI."
    echo "If you want to use AI-powered analysis, please set the OPENAI_API_KEY environment variable."
    echo ""
else
    # Update the docker-compose.prod.yml file to include the API key
    sed -i "s/# - OPENAI_API_KEY=your_openai_api_key_here/- OPENAI_API_KEY=$OPENAI_API_KEY/" docker-compose.prod.yml
    echo "Using OpenAI API key from environment variable."
fi

# Build and start the containers using the production configuration
echo "Building and starting production containers..."
docker-compose -f docker-compose.prod.yml up --build -d

# Check if containers are running
echo "Checking containers status..."
docker-compose -f docker-compose.prod.yml ps

echo "Production deployment complete! Your application should be available at:"
echo "- Frontend: http://localhost"
echo "- Backend API: http://localhost:5000"
echo ""
echo "To monitor the application:"
echo "- View logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "- Check health: docker inspect --format='{{json .State.Health.Status}}' jira-analyzer-backend jira-analyzer-frontend"
echo ""
echo "To stop the application: docker-compose -f docker-compose.prod.yml down"