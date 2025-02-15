const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../utils/errorResponse");
const Shop = require("../../models/Shop");

// @desc     Add Shop in Resturant Manufacture
// @route    POST /api/v1/shop
// @access   Private

const addShop = asyncHandler(async (req, res, next) => {
  const { image, shopName, description, openHours, locations, services } =
    req.body;

  const shop = await Shop.create({
    image,
    shopName,
    description,
    openHours,
    locations,
    services,
    owner: req.user._id,
  });

  res.status(201).json({ success: true, message: "Shop creating success" });
});

// @desc     Get All Shop
// @route    GET /api/v1/shops
// @access   Public

const getAllShops = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc     Get Single Shop
// @route    GET /api/v1/shops/:id
// @access   Public

const getShop = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const shop = await Shop.findById(id);

  if (!shop) {
    return next(new ErrorResponse("Shop Not Found", 404));
  }

  res.status(200).json({ success: true, data: shop });
});

// @desc     Update Shop
// @route    PUT /api/v1/shops/:id
// @access   Private

const updateShop = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { image, shopName, description, openHours, locations, services } =
    req.body;
  const shop = await Shop.findById(id);

  if (!shop) {
    return next(new ErrorResponse("Shop Not Found", 404));
  }

  if (shop.owner.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse(`You have no permission to update this shop`, 403)
    );
  }

  shop.image = image || shop.image;
  shop.shopName = shopName || shop.shopName;
  shop.description = description || shop.description;
  shop.openHours = openHours || shop.openHours;
  shop.locations = locations || shop.locations;
  shop.services = services || shop.services;

  await shop.save();

  res.status(200).json({ success: true, message: "Shop Update success" });
});

// @desc     Delete Shop
// @route    DELETE /api/v1/shops/:id
// @access   Private

const deleteShop = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const shop = await Shop.findById(id);

  if (!shop) {
    return next(new ErrorResponse("Shop Not Found", 404));
  }

  if (shop.owner.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse(`You have no permission to delete this shop`, 403)
    );
  }

  await shop.deleteOne();

  res.status(200).json({ success: true, message: "Shop Delete success" });
});

module.exports = { addShop, getAllShops, getShop, updateShop, deleteShop };
