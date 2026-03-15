const router = require('express').Router();
const registrationsController = require('../controllers/registrations');

router.get('/', registrationsController.getAllRegistrations);
router.post('/', registrationsController.createRegistration);

module.exports = router;
