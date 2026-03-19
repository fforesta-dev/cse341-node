const router = require('express').Router();
const membersController = require('../controllers/members');
const requireAuth = require('../middleware/requireAuth');

router.get('/', membersController.getAllMembers);
router.post('/', requireAuth, membersController.createMember);
router.put('/:id', requireAuth, membersController.updateMember);
router.delete('/:id', requireAuth, membersController.deleteMember);

module.exports = router;
