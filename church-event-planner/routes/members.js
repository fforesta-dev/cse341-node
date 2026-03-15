const router = require('express').Router();
const membersController = require('../controllers/members');

router.get('/', membersController.getAllMembers);
router.post('/', membersController.createMember);

module.exports = router;
