const Event = require('../models/eventModel.js');
const asyncHandler = require('express-async-handler');

// @desc Fetch all events
// @route GET /api/events
// @access Public
const getEvents = asyncHandler(async (req, res) => {
  Event.find({
    $and: [
      { name: { $ne: null } },
      { location: { $ne: null } },
      { date: { $ne: null } },

      // { date: { $gte: new Date('Sun, October 10, 2021') } },
    ],
  }).then((data) => res.send(data));
});

// @desc Fetch a single event
// @route GET /api/events/:id
// @access Public
const getSingleEvent = asyncHandler(async (req, res) => {
  // find by req.params.id
  const singleEvent = await Event.findOne({ uid: req.params.id });
  if (singleEvent) {
    res.status(200).send(singleEvent);
  } else {
    // formated but not existed id
    res.status(404);
    throw new Error('Event not found');
  }
});


const getEventsByZip = asyncHandler(async (req, res) => {
  
  const zipcode = req.params.id;
  var substring = zipcode.slice(0, -2); 
  

 

  Event.find({zipcode: {$regex: substring}, $options: 'i'

 
      // { date: { $gte: new Date('Sun, October 10, 2021') } },
   
  }).then((data) => res.send(data));
});


module.exports = { getEvents, getSingleEvent, getEventsByZip };
