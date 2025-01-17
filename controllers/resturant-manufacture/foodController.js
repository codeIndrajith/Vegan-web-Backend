const asyncHandler = require('../../middleware/async')
const ErrorResponse = require('../../utils/errorResponse');
const Food = require('../../models/Food')


// @desc     Add Food in Resturant Manufacture
// @route    POST /api/v1/food
// @access   Private

const addFood = asyncHandler(async (req, res, next) => {
    const { image, productName, productPrice, description, productIncludes } = req.body;
  
    const food = await Food.create({
      image,
      productName,
      productPrice,
      description,
      productIncludes,
      owner: req.user._id
    });

    res.status(201).json({success: true, message: "Food creating success"})
  
  });


// @desc     Get All Foods
// @route    GET /api/v1/foods
// @access   Public

const getAllFoods = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults);
})

// @desc     Get Single Food
// @route    GET /api/v1/foods/:id
// @access   Public

const getFood = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const food = await Food.findById(id);

    if(!food) {
        return next(new ErrorResponse("Food Not Found", 404))
    }
    
    res.status(200).json({success: true, data: food});
})

// @desc     Update Food
// @route    PUT /api/v1/foods/:id
// @access   Private

const updateFood = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const { image , productName, productPrice, description, productIncludes } = req.body
    const food = await Food.findById(id);

    if(!food) {
        return next(new ErrorResponse("Food Not Found", 404))
    }

    if(food.owner.toString() !== req.user._id.toString()) {
        return next(new ErrorResponse(`You have no permission to update this product`,403))
    }

    food.image = image || food.image;
    food.productName = productName || food.productName;
    food.productPrice = productPrice || food.productPrice;
    food.description = description || food.description;
    food.productIncludes = productIncludes || food.productIncludes

    await food.save();
    
    res.status(200).json({success: true, message: "Food Update success"});
})

// @desc     Delete Food
// @route    DELETE /api/v1/foods/:id
// @access   Private

const deleteFood = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const food = await Food.findById(id);

    if(!food) {
        return next(new ErrorResponse("Food Not Found", 404))
    }

    if(food.owner.toString() !== req.user._id.toString()) {
        return next(new ErrorResponse(`You have no permission to delete this product`,403))
    }

    await food.deleteOne();
    
    res.status(200).json({success: true, message: "Food Delete success"});
})

module.exports = { addFood, getAllFoods, getFood, updateFood, deleteFood };