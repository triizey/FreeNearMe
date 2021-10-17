const router = require('express').Router();
const {
  getEvents,
  getSingleEvent,
  getDefaultEvents,
  getEventsByZip,
} = require('../controllers/eventController');

// @desc Fetch all events
// @route GET /api/events
// @access Public
router.route('/').get(getEvents);

// @desc Fetch default events in San Francisco
// @route GET /api/events/defaults
// @access Public
router.route('/defaultEvents').get(getDefaultEvents);

// @desc Fetch a single event
// @route GET /api/events/:id
// @access Public
router.route('/:id').get(getSingleEvent);
router.route('/byzipcode/:id').get(getEventsByZip);
module.exports = router;
