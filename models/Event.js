const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: [true, "Please add a Product Name"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  date: {
    type: Date,
    required: [true, "Please add a Date"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
