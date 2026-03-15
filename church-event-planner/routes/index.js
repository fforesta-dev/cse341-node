const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Church Event Planner API');
});

router.use('/events', require('./events'));
router.use('/members', require('./members'));
router.use('/registrations', require('./registrations'));

module.exports = router;
