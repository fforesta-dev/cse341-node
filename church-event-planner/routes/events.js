const router = require('express').Router();
const eventsController = require('../controllers/events');
const requireAuth = require('../middleware/requireAuth');

router.get('/', eventsController.getAllEvents);
router.post('/', requireAuth, eventsController.createEvent);
router.put('/:id', requireAuth, eventsController.updateEvent);
router.delete('/:id', requireAuth, eventsController.deleteEvent);

module.exports = router;
