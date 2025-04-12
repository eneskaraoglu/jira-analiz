# Production Deployment Guide

This guide provides instructions for deploying the Jira CSV Quality Analyzer in a production environment using Docker.

## Production vs Development Deployment

The project includes two Docker Compose configurations:

1. **Development** (`docker-compose.yml`): Suitable for local development and testing
2. **Production** (`docker-compose.prod.yml`): Optimized for production environments with:
   - Resource limits for containers
   - Health checks for monitoring
   - Named volumes for data persistence
   - Advanced restart policies

## Deploying to Production

### Prerequisites

- Docker and Docker Compose installed
- Server with sufficient resources (recommended: 1GB RAM, 1 CPU)
- OpenAI API key (optional, for AI-powered analysis)

### Automated Deployment

Use the provided deployment script:

**On Linux/Mac:**
```bash
chmod +x deploy-production.sh
./deploy-production.sh
```

**On Windows:**
```
deploy-production.bat
```

### Manual Deployment

1. **Set environment variables (optional):**
   ```bash
   export OPENAI_API_KEY=your_api_key_here
   ```

2. **Edit the production configuration if needed:**
   - Open `docker-compose.prod.yml`
   - Uncomment and update the OPENAI_API_KEY line if you want to use AI
   - Adjust resource limits if necessary

3. **Build and start the containers:**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

## Monitoring and Maintenance

### Checking Container Status

```bash
docker-compose -f docker-compose.prod.yml ps
```

### Viewing Logs

```bash
docker-compose -f docker-compose.prod.yml logs -f
```

### Checking Container Health

```bash
docker inspect --format='{{json .State.Health.Status}}' jira-analyzer-backend jira-analyzer-frontend
```

### Restarting Services

```bash
docker-compose -f docker-compose.prod.yml restart
```

### Stopping the Application

```bash
docker-compose -f docker-compose.prod.yml down
```

To remove volumes as well:
```bash
docker-compose -f docker-compose.prod.yml down -v
```

## Scaling for Higher Load

For environments with higher traffic, consider:

1. **Increasing resource limits** in the `docker-compose.prod.yml` file:
   ```yaml
   resources:
     limits:
       cpus: '1.0'  # Increase CPU allocation
       memory: 1G   # Increase memory allocation
   ```

2. **Using a dedicated database** for storing analysis results

3. **Setting up load balancing** with multiple frontend instances

## Backup and Recovery

### Backing Up Data

The application stores uploaded files in a Docker volume. To back up this data:

```bash
docker run --rm -v jira_uploads:/data -v $(pwd):/backup alpine tar czf /backup/uploads-backup.tar.gz /data
```

### Restoring Data

To restore from a backup:

```bash
docker run --rm -v jira_uploads:/data -v $(pwd):/backup alpine sh -c "cd /data && tar xzf /backup/uploads-backup.tar.gz --strip 1"
```

## Security Considerations

1. **API Key Security**: Never commit your OpenAI API key to version control. Always use environment variables or secure secrets management.

2. **Network Security**: Consider running the application behind a reverse proxy with HTTPS.

3. **Container Security**: Keep Docker and container images updated.

4. **File Upload Security**: The application validates CSV uploads, but consider additional security measures for sensitive data.