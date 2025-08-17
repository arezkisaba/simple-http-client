import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'A simple Express API application with Swagger documentation',
        },
        servers: [
            {
                url: 'http://localhost:4445',
            },
        ],
        components: {
            schemas: {
                GetHtmlResponse: {
                    type: 'object',
                    properties: {
                        Html: {
                            type: 'string',
                            description: 'The HTML content of the requested URL',
                        },
                        FromCache: {
                            type: 'boolean',
                            description: 'Indicates if the response was served from cache',
                            default: false,
                        },
                    },
                },
                GetHtmlCommand: {
                    type: 'object',
                    properties: {
                        Url: {
                            type: 'string',
                            description: 'The URL to fetch HTML content from',
                        },
                        UseCache: {
                            type: 'boolean',
                            default: true,
                            description: 'Whether to use cache for the request',
                        }
                    }
                }
            },
        },
    },
    apis: [
        './src/**/routes/*.ts',  // For development
        './dist/**/routes/*.js'  // For production (Docker)
    ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
