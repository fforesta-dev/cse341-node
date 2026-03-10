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
        favoriteColor: {
          type: 'string',
          example: 'Blue',
          description: 'Favorite color of the contact (required)',
        },
        birthday: {
          type: 'string',
          example: '1990-05-15',
          description: 'Birthday of the contact in YYYY-MM-DD format (required)',
        },
      },
      required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
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
        favoriteColor: {
          type: 'string',
          example: 'Blue',
        },
        birthday: {
          type: 'string',
          example: '1990-05-15',
        },
      },
      required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
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
