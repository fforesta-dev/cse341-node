const router = require('express').Router();
const membersController = require('../controllers/members');

router.get('/', membersController.getAllMembers);
router.post('/', membersController.createMember);
router.put('/:id', membersController.updateMember);
router.delete('/:id', membersController.deleteMember);

module.exports = router;
