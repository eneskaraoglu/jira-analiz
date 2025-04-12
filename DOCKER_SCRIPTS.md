# Docker Scripts Guide

This guide explains how to use the Docker scripts provided with the Jira CSV Quality Analyzer.

## Available Scripts

### For Windows

- `manage-containers.bat` - All-in-one management tool
- `build-images.bat` - Build Docker images
- `run-containers.bat` - Create and run containers
- `start-containers.bat` - Start existing containers
- `stop-containers.bat` - Stop running containers
- `container-status.bat` - Check container status

### For Linux/Mac

- `manage-containers.sh` - All-in-one management tool
- `build-images.sh` - Build Docker images
- `run-containers.sh` - Create and run containers
- `start-containers.sh` - Start existing containers
- `stop-containers.sh` - Stop running containers
- `container-status.sh` - Check container status

## Quick Start

### Using the All-in-One Management Tool

**Windows:**
```
manage-containers.bat
```

**Linux/Mac:**
```bash
chmod +x *.sh
./manage-containers.sh
```

This will display a menu with all available options.

### Manual Steps

1. **Build the Docker images**
   ```
   build-images.bat
   ```
   or
   ```bash
   ./build-images.sh
   ```

2. **Create and run the containers**
   ```
   run-containers.bat
   ```
   or
   ```bash
   ./run-containers.sh
   ```

3. **Check container status**
   ```
   container-status.bat
   ```
   or
   ```bash
   ./container-status.sh
   ```

4. **Stop the containers when you're done**
   ```
   stop-containers.bat
   ```
   or
   ```bash
   ./stop-containers.sh
   ```

## Container Configuration

These scripts create and manage the following Docker resources:

1. **Network**: `jira-analyzer-network`
   - Allows the frontend and backend containers to communicate

2. **Volume**: `jira-analyzer-uploads`
   - Stores uploaded CSV files
   - Persists data even when containers are removed

3. **Backend Container**: `jira-analyzer-backend`
   - Runs on port 5000
   - Environment: production
   - Restart policy: unless-stopped

4. **Frontend Container**: `jira-analyzer-frontend`
   - Runs on port 80
   - Restart policy: unless-stopped

## Troubleshooting

If you encounter issues:

1. **Check container status**
   - Use `container-status.bat` or `./container-status.sh`
   - Check if containers are running

2. **View container logs**
   - Option 6 in the management script
   - Or use `docker logs jira-analyzer-backend` or `docker logs jira-analyzer-frontend`

3. **Restart containers**
   - Stop and start the containers using the respective scripts

4. **Rebuild from scratch**
   - Option 7 in the management script removes all containers and images
   - Then choose Option 1 to rebuild images and Option 2 to recreate containers