# Simple HTTP Client

A containerized HTTP client application built with Node.js, TypeScript, and Express that provides REST API endpoints for fetching HTML content from web pages.

## Features

- **REST API**: Fetch HTML content from URLs via HTTP endpoints
- **Dual HTTP Clients**: Choose between basic HTTP requests (fetch) or headless browser (Puppeteer)
- **Caching System**: In-memory caching with configurable TTL
- **Docker Support**: Fully containerized with optimized Chrome installation
- **Environment Configuration**: Configurable via environment variables
- **Swagger Documentation**: Auto-generated API documentation
- **Retry Logic**: Automatic retry with exponential backoff for failed requests

## Project Structure

```
src/
├── features/
│   ├── http-client/
│   │   ├── routes/HttpClientRoutes.ts
│   │   ├── commands/
│   │   └── responses/
│   ├── _shared/
│   │   ├── HeadlessHttpClient.ts
│   │   ├── BasicHttpClient.ts
│   │   └── contracts/
│   ├── healthcheck/
│   └── openapi/
├── container/
└── ...
```

## API Endpoints

### POST /api/http-client
Fetch HTML content from a URL using either basic HTTP or headless browser.
- **Body**: `GetHtmlCommand` with `url`, `useCache`, and `useBasicHttpClient` fields

### GET /healthcheck
Health check endpoint for monitoring application status.

## Environment Variables

Create a `.env` file with the following variables:

```env
APP_PORT=4445
NODE_ENV=development
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
```

## Docker Setup

### Prerequisites
- Docker and Docker Network support
- The application runs on port 4445

### Running the Application

1. **Clone the repository**
```bash
git clone <repository-url>
cd simple-http-client
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Run with Docker**
```bash
docker build -t simple-http-client .
docker run -p 4445:4445 simple-http-client
```

The Docker setup will:
- Use Debian-based Node.js image for Chrome compatibility
- Install Google Chrome for Puppeteer
- Build TypeScript application
- Run optimized production container

### Docker Network

The application can be connected to custom Docker networks for inter-container communication:

```bash
docker network create simple-net
docker run -d --name http-client --network simple-net -p 4445:4445 simple-http-client:latest
```

Use the provided `docker-connect.sh` script to connect to the same network for testing:

```bash
./docker-connect.sh
```

## Development

### Local Development
```bash
npm install
npm run dev
```

### Building
```bash
npm run build
```

### Testing
```bash
npm test
```

## Error Handling

The application provides comprehensive error responses including:
- Error message and type
- Stack traces (in development)
- Request details (URL, method, headers)
- Timestamp and environment information
- Retry attempts for failed requests

## Dependencies

- **Express**: Web framework
- **TypeScript**: Type safety
- **TSyringe**: Dependency injection
- **Swagger**: API documentation
- **Puppeteer**: Headless browser automation
- **he**: HTML entity decoding

## License

[License information]

## Contributing

[Contributing guidelines]
