const routes = require('express').Router();
const temples = require('../controllers/temple.js');

// #swagger.tags = ['Temples']
// #swagger.description = 'Get all temples'
// #swagger.security = [{ "apiKey": [] }]
/* #swagger.parameters['apiKey'] = {
    in: 'header',
    description: 'API Key for authentication',
    required: true,
    type: 'string'
} */
/* #swagger.responses[200] = {
    description: 'List of all temples',
    schema: [{ $ref: '#/definitions/Temple' }]
} */
/* #swagger.responses[500] = {
    description: 'Error retrieving temples'
} */
routes.get('/', temples.findAll);

// #swagger.tags = ['Temples']
// #swagger.description = 'Get a specific temple by ID'
// #swagger.security = [{ "apiKey": [] }]
/* #swagger.parameters['temple_id'] = {
    in: 'path',
    description: 'Temple ID',
    required: true,
    type: 'number'
} */
/* #swagger.parameters['apiKey'] = {
    in: 'header',
    description: 'API Key for authentication',
    required: true,
    type: 'string'
} */
/* #swagger.responses[200] = {
    description: 'Temple data',
    schema: { $ref: '#/definitions/Temple' }
} */
/* #swagger.responses[404] = {
    description: 'Temple not found'
} */
/* #swagger.responses[500] = {
    description: 'Error retrieving temple'
} */
routes.get('/:temple_id', temples.findOne);

// #swagger.tags = ['Temples']
// #swagger.description = 'Create a new temple'
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Temple data',
    required: true,
    schema: { $ref: '#/definitions/TempleInput' }
} */
/* #swagger.responses[200] = {
    description: 'Temple created successfully',
    schema: { $ref: '#/definitions/Temple' }
} */
/* #swagger.responses[400] = {
    description: 'Invalid request - name is required'
} */
/* #swagger.responses[500] = {
    description: 'Error creating temple'
} */
routes.post('/', temples.create);

// #swagger.tags = ['Temples']
// #swagger.description = 'Update a temple by ID'
// #swagger.security = [{ "apiKey": [] }]
/* #swagger.parameters['temple_id'] = {
    in: 'path',
    description: 'Temple ID',
    required: true,
    type: 'number'
} */
/* #swagger.parameters['apiKey'] = {
    in: 'header',
    description: 'API Key for authentication',
    required: true,
    type: 'string'
} */
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated temple data',
    required: true,
    schema: { $ref: '#/definitions/TempleInput' }
} */
/* #swagger.responses[200] = {
    description: 'Temple updated successfully'
} */
/* #swagger.responses[400] = {
    description: 'Invalid request data'
} */
/* #swagger.responses[404] = {
    description: 'Temple not found'
} */
/* #swagger.responses[500] = {
    description: 'Error updating temple'
} */
routes.put('/:temple_id', temples.update);

// #swagger.tags = ['Temples']
// #swagger.description = 'Delete a temple by ID'
// #swagger.security = [{ "apiKey": [] }]
/* #swagger.parameters['temple_id'] = {
    in: 'path',
    description: 'Temple ID',
    required: true,
    type: 'number'
} */
/* #swagger.parameters['apiKey'] = {
    in: 'header',
    description: 'API Key for authentication',
    required: true,
    type: 'string'
} */
/* #swagger.responses[200] = {
    description: 'Temple deleted successfully'
} */
/* #swagger.responses[404] = {
    description: 'Temple not found'
} */
/* #swagger.responses[500] = {
    description: 'Error deleting temple'
} */
routes.delete('/:temple_id', temples.delete);

module.exports = routes;
