const router = require('express').Router();
const Event = require('../models/eventModel.js');
const asyncHandler = require('express-async-handler');

// @desc Fetch all events
// @route GET /api/events
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    Event.find().then((data) => res.send(data));
  }),
);

// @desc Fetch a single event
// @route GET /api/events/:id
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    // find by req.params.id
    const singleEvent = await Event.findOne({ uid: req.params.id });
    if (singleEvent) {
      res.status(200).send(singleEvent);
    } else {
      // formated but not existed id
      res.status(404);
      throw new Error('Event not found');
    }
  }),
);

module.exports = router;
