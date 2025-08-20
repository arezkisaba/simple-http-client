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