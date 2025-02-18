const express = require("express");
const router = express.Router();

const advancedResults = require("../../middleware/advancedResults");
const {
  addEvent,
  getAllEvent,
} = require("../../controllers/Events/EventsController");
const { protect, authorize } = require("../../middleware/authMiddleware");
const Event = require("../../models/Event");

router
  .route("/")
  .post(protect, authorize("eventUser"), addEvent)
  .get(advancedResults(Event), getAllEvent);

module.exports = router;
