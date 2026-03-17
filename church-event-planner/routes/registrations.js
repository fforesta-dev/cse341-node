const router = require('express').Router();
const registrationsController = require('../controllers/registrations');

router.get('/', registrationsController.getAllRegistrations);
router.post('/', registrationsController.createRegistration);
router.put('/:id', registrationsController.updateRegistration);
router.delete('/:id', registrationsController.deleteRegistration);

module.exports = router;
