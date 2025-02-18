// @desc     Add Event in Mobile User
// @route    POST /api/v1/event
// @access   Public

const asyncHandler = require("../../middleware/async");
const Event = require("../../models/Event");

const addEvent = asyncHandler(async (req, res, next) => {
  const { image, productName, description, date } = req.body;

  const event = await Event.create({
    image,
    productName,
    description,
    date,
  });

  res.status(201).json({ success: true, message: "Event creating success" });
});

// @desc     Get All Event
// @route    GET /api/v1/event
// @access   Public

const getAllEvent = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

module.exports = { addEvent, getAllEvent };
