# Docker Deployment Guide for Jira CSV Quality Analyzer

This guide explains how to deploy the Jira CSV Quality Analyzer using Docker containers.

## Prerequisites

Make sure you have the following installed:
- Docker ([Install Docker](https://docs.docker.com/get-docker/))
- Docker Compose ([Install Docker Compose](https://docs.docker.com/compose/install/))

## Quick Start

For the easiest deployment, use the provided script:

**On Windows:**
```
docker-deploy.bat
```

**On Linux/Mac:**
```bash
chmod +x docker-deploy.sh
./docker-deploy.sh
```

This will build and start both the frontend and backend containers. Once complete, the application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:5000

## Manual Deployment

If you prefer to deploy manually:

1. **Build and start the containers:**
   ```bash
   docker-compose up --build -d
   ```

2. **Check the status of the containers:**
   ```bash
   docker-compose ps
   ```

3. **View logs (if needed):**
   ```bash
   docker-compose logs -f
   ```

## Configuration

### Environment Variables

The backend service uses environment variables for configuration. You can modify these in the `docker-compose.yml` file:

```yaml
environment:
  - PORT=5000
  - NODE_ENV=production
  # Uncomment and add your OpenAI API key if you want to use AI-powered analysis
  # - OPENAI_API_KEY=your_openai_api_key_here
```

### Persistent Storage

The application uses a Docker volume to persist uploaded files:

```yaml
volumes:
  - ./backend/uploads:/usr/src/app/uploads
```

This ensures that uploaded files remain available even if the container is restarted.

## Stopping the Application

To stop the application:

```bash
docker-compose down
```

To stop and remove all containers, networks, and volumes:

```bash
docker-compose down -v
```

## Troubleshooting

### Frontend can't connect to the backend

If the frontend can't connect to the backend, check that:
1. Both containers are running (`docker-compose ps`)
2. The Nginx configuration is correct
3. The backend API is accessible

### File uploads don't work

If file uploads aren't working:
1. Check that the uploads directory exists and has the correct permissions
2. Verify that the volume is mounted correctly
3. Check the backend logs for any errors (`docker-compose logs backend`)

### Other issues

For other issues:
1. Check the logs: `docker-compose logs`
2. Make sure all required ports are available (80 and 5000)
3. Verify that Docker has sufficient resources allocated