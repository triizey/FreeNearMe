const mongoose = require('mongoose');

const savedEventSchema = new mongoose.Schema({
  organizedby: String,
  organizedby_link: String,
  name: String,
  price: String,
  url: String,
  timestamp: Number,
  uid: {
    type: String,
    required: true,
  },
  index: Number,
  description: String,
  date: String,
  zipcode: String,
  url_uid: Number,
  time: String,
  description_link: String,
  location: String,
  imgs: String,
});

module.exports = mongoose.model('savedEvent', savedEventSchema);
