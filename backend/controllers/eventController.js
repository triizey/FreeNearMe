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
      // { date: { $gte: new Date('Sun, October 10, 2021') } },
    ],
  }).then((data) => res.send(data));
});

// @desc Fetch default events in San Francisco
// @route GET /api/events/defaultEvents
// @access Public
const getDefaultEvents = asyncHandler(async (req, res) => {
  //  let x= ["2020-10-21,"29-05-2021"]
  // x.forEach((d)=>{
  // console.log(new Date(d))
  // let x= ["2020-10-21,"29-05-2021"]
  // x.forEach((d)=>{
  // console.log(new Date(d))
  //   let x= ["2020-10-21,"29-05-2021"]
  // x.forEach((d)=>{
  // if(!isNaN(Date.parse(d))){
  // console.log(new Date(d))
  // }
  // })

  Event.find({
    $and: [
      { name: { $ne: null } },
      { location: { $ne: null } },
      { zipcode: { $regex: 'CA' } },
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

module.exports = { getEvents, getSingleEvent, getDefaultEvents };
