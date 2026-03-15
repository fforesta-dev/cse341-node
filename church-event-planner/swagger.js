const fs = require('fs');
const path = require('path');

const swaggerDoc = {
  swagger: '2.0',
  info: {
    title: 'Church Event Planner API',
    description: 'Simple REST API for managing church events, members, and registrations.',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/events/': {
      get: {
        summary: 'Get all events',
        description: 'Returns all event documents from the events collection.',
        responses: {
          200: {
            description: 'Events retrieved',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/EventInput',
              },
            },
          },
          500: {
            description: 'Server error',
            schema: {
              $ref: '#/definitions/ErrorResponse',
            },
          },
        },
      },
      post: {
        summary: 'Create event',
        description: 'Creates a new event in the events collection.',
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/EventInput',
            },
          },
        ],
        responses: {
          201: {
            description: 'Event created',
            schema: {
              $ref: '#/definitions/EventCreated',
            },
          },
          400: {
            description: 'Validation error',
            schema: {
              $ref: '#/definitions/ErrorResponse',
            },
          },
          500: {
            description: 'Server error',
            schema: {
              $ref: '#/definitions/ErrorResponse',
            },
          },
        },
      },
    },
    '/members/': {
      get: {
        summary: 'Get all members',
        description: 'Returns all member documents from the members collection.',
        responses: {
          200: {
            description: 'Members retrieved',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/MemberInput',
              },
            },
          },
          500: {
            description: 'Server error',
            schema: {
              $ref: '#/definitions/ErrorResponse',
            },
          },
        },
      },
      post: {
        summary: 'Create member',
        description: 'Creates a new member in the members collection.',
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/MemberInput',
            },
          },
        ],
        responses: {
          201: {
            description: 'Member created',
            schema: {
              $ref: '#/definitions/MemberCreated',
            },
          },
          400: {
            description: 'Validation error',
            schema: {
              $ref: '#/definitions/ErrorResponse',
            },
          },
          500: {
            description: 'Server error',
            schema: {
              $ref: '#/definitions/ErrorResponse',
            },
          },
        },
      },
    },
    '/registrations/': {
      get: {
        summary: 'Get all registrations',
        description: 'Returns all registration documents from the registrations collection.',
        responses: {
          200: {
            description: 'Registrations retrieved',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/RegistrationInput',
              },
            },
          },
          500: {
            description: 'Server error',
            schema: {
              $ref: '#/definitions/ErrorResponse',
            },
          },
        },
      },
      post: {
        summary: 'Create registration',
        description: 'Creates a new registration in the registrations collection.',
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/RegistrationInput',
            },
          },
        ],
        responses: {
          201: {
            description: 'Registration created',
            schema: {
              $ref: '#/definitions/RegistrationCreated',
            },
          },
          400: {
            description: 'Validation error',
            schema: {
              $ref: '#/definitions/ErrorResponse',
            },
          },
          500: {
            description: 'Server error',
            schema: {
              $ref: '#/definitions/ErrorResponse',
            },
          },
        },
      },
    },
  },
  definitions: {
    EventInput: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Ward Temple Night' },
        description: {
          type: 'string',
          example: 'Temple trip planning meeting and assignments',
        },
        date: { type: 'string', example: '2026-03-20' },
        time: { type: 'string', example: '19:00' },
        location: { type: 'string', example: 'Stake Center Room 201' },
        capacity: { type: 'number', example: 60 },
        organizerName: { type: 'string', example: 'Bishop Johnson' },
        eventType: { type: 'string', example: 'Planning' },
      },
    },
    EventCreated: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Event created' },
        id: { type: 'string', example: '65efab1234567890abcdef12' },
      },
    },
    MemberInput: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'Emily' },
        lastName: { type: 'string', example: 'Clark' },
        email: { type: 'string', example: 'emily.clark@email.com' },
        phone: { type: 'string', example: '801-555-1234' },
        ward: { type: 'string', example: 'Provo 3rd Ward' },
        calling: { type: 'string', example: 'Relief Society President' },
        isActive: { type: 'boolean', example: true },
      },
    },
    MemberCreated: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Member created' },
        id: { type: 'string', example: '65efab1234567890abcdef13' },
      },
    },
    RegistrationInput: {
      type: 'object',
      properties: {
        eventId: { type: 'string', example: '65efab1234567890abcdef12' },
        memberId: { type: 'string', example: '65efab1234567890abcdef13' },
        status: { type: 'string', example: 'Registered' },
        notes: { type: 'string', example: 'Will bring refreshments.' },
      },
    },
    RegistrationCreated: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Registration created' },
        id: { type: 'string', example: '65efab1234567890abcdef14' },
      },
    },
    ErrorResponse: {
      type: 'object',
      properties: {
        error: { type: 'string', example: 'Missing required fields' },
      },
    },
  },
};

const outputPath = path.join(__dirname, 'swagger.json');
fs.writeFileSync(outputPath, JSON.stringify(swaggerDoc, null, 2));
console.log('Swagger documentation generated successfully');
