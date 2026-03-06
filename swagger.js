const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts with CRUD operations',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    Contact: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '507f1f77bcf86cd799439011',
          description: 'MongoDB ObjectId for the contact',
        },
        firstName: {
          type: 'string',
          example: 'John',
          description: 'First name of the contact (required)',
        },
        lastName: {
          type: 'string',
          example: 'Doe',
          description: 'Last name of the contact (required)',
        },
        email: {
          type: 'string',
          example: 'john.doe@example.com',
          description: 'Email address of the contact (required)',
        },
        phone: {
          type: 'string',
          example: '801-555-1234',
          description: 'Phone number of the contact (required)',
        },
        address: {
          type: 'string',
          example: '123 Main Street',
          description: 'Street address (optional)',
        },
        city: {
          type: 'string',
          example: 'Provo',
          description: 'City name (optional)',
        },
        state: {
          type: 'string',
          example: 'UT',
          description: 'State abbreviation (optional)',
        },
        zipCode: {
          type: 'string',
          example: '84604',
          description: 'Zip code (optional)',
        },
      },
      required: ['firstName', 'lastName', 'email', 'phone'],
    },
    NewContact: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          example: 'John',
        },
        lastName: {
          type: 'string',
          example: 'Doe',
        },
        email: {
          type: 'string',
          example: 'john.doe@example.com',
        },
        phone: {
          type: 'string',
          example: '801-555-1234',
        },
        address: {
          type: 'string',
          example: '123 Main Street',
        },
        city: {
          type: 'string',
          example: 'Provo',
        },
        state: {
          type: 'string',
          example: 'UT',
        },
        zipCode: {
          type: 'string',
          example: '84604',
        },
      },
      required: ['firstName', 'lastName', 'email', 'phone'],
    },
    Error: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          example: 'Error message',
        },
      },
    },
  },
};

const outputFile = './swagger.json';
const routes = ['./index.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log('Swagger documentation generated successfully');
});
