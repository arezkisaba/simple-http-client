# Simple HTTP Client

A Node.js backend service built with Express that provides HTTP client functionality. This project includes CORS support, Swagger API documentation, and IP checking middleware.

## Features

- RESTful API for making HTTP requests
- Swagger UI API documentation at `/api-docs`
- IP validation middleware
- Cross-Origin Resource Sharing (CORS) support
- Containerized with Docker
- Puppeteer support for browser automation

## Build Instructions

```bash
# Build the Docker image
docker build -t simple-http-client:latest .

# Run the container
docker run -p <host_port>:<container_port> -e APP_PORT=<container_port> simple-http-client:latest

# Remove existing image, build and run the container
docker stop <containerId> && docker rm <containerId> && docker build -t simple-http-client:latest . && docker run -p 4445:4445 -e APP_PORT=4445 simple-http-client:latest
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
