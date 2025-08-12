# Newspaper Dating App

A React TypeScript application styled like a newspaper with dating profiles.

## Running Locally with Docker

This project is configured to run using Docker without requiring local Node.js or npm installation.

### Prerequisites

- Docker installed on your system
- Docker Compose (usually comes with Docker)

### Quick Start

1. **Build and run the application:**
   ```bash
   docker-compose up --build
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

### Development

The app will automatically reload when you make changes to the source code thanks to the volume mounting in docker-compose.yml.

### Stopping the Application

Press `Ctrl+C` in the terminal or run:
```bash
docker-compose down
```

### Rebuilding

If you make changes to dependencies or the Dockerfile:
```bash
docker-compose up --build
```

## Features

- Newspaper-style layout with dating profiles
- Like and message functionality
- Responsive design
- TypeScript support
- Tailwind CSS styling
