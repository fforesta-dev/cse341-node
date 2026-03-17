const router = require('express').Router();
const eventsController = require('../controllers/events');

router.get('/', eventsController.getAllEvents);
router.post('/', eventsController.createEvent);
router.put('/:id', eventsController.updateEvent);
router.delete('/:id', eventsController.deleteEvent);

module.exports = router;
