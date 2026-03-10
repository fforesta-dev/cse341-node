const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Temple API',
    description: 'LDS Temple API for BYU-Idaho student projects',
    version: '1.0.0',
  },
  host: 'localhost:8080',
  schemes: ['http', 'https'],
  securityDefinitions: {
    apiKey: {
      type: 'apiKey',
      in: 'header',
      name: 'apiKey',
      description: 'API Key for authentication',
    },
  },
  definitions: {
    Temple: {
      type: 'object',
      properties: {
        temple_id: {
          type: 'number',
          example: 1,
        },
        name: {
          type: 'string',
          example: 'Salt Lake Temple',
        },
        location: {
          type: 'string',
          example: 'Salt Lake City, Utah',
        },
        dedicated: {
          type: 'string',
          example: '1893-04-06',
        },
        additionalInfo: {
          type: 'boolean',
          example: true,
        },
      },
    },
    TempleInput: {
      type: 'object',
      required: ['name'],
      properties: {
        temple_id: {
          type: 'number',
          example: 100,
        },
        name: {
          type: 'string',
          example: 'New Temple',
        },
        location: {
          type: 'string',
          example: 'City, State',
        },
        dedicated: {
          type: 'string',
          example: '2024-01-01',
        },
        additionalInfo: {
          type: 'boolean',
          example: false,
        },
      },
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
