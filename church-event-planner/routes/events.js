const router = require('express').Router();
const eventsController = require('../controllers/events');

// #swagger.tags = ['Events']
// #swagger.description = 'Returns all event documents from the events collection.'
/* #swagger.responses[200] = {
    description: 'Events retrieved',
    schema: [{ $ref: '#/definitions/EventInput' }]
} */
/* #swagger.responses[500] = {
    description: 'Server error',
    schema: { $ref: '#/definitions/ErrorResponse' }
} */
router.get('/', eventsController.getAllEvents);

// #swagger.tags = ['Events']
// #swagger.description = 'Creates a new event in the events collection.'
/* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: { $ref: '#/definitions/EventInput' }
} */
/* #swagger.responses[201] = {
    description: 'Event created',
    schema: { $ref: '#/definitions/EventCreated' }
} */
/* #swagger.responses[400] = {
    description: 'Validation error',
    schema: { $ref: '#/definitions/ErrorResponse' }
} */
/* #swagger.responses[500] = {
    description: 'Server error',
    schema: { $ref: '#/definitions/ErrorResponse' }
} */
router.post('/', eventsController.createEvent);

module.exports = router;
