const router = require('express').Router();
const registrationsController = require('../controllers/registrations');
const requireAuth = require('../middleware/requireAuth');

router.get('/', registrationsController.getAllRegistrations);
router.post('/', requireAuth, registrationsController.createRegistration);
router.put('/:id', requireAuth, registrationsController.updateRegistration);
router.delete('/:id', requireAuth, registrationsController.deleteRegistration);

module.exports = router;
