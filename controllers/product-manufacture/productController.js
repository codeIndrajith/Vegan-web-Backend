const asyncHandler = require('../../middleware/async')
const ErrorResponse = require('../../utils/errorResponse');
const Product = require('../../models/Product')


// @desc     Add Products in Product Manufacture
// @route    POST /api/v1/product
// @access   Private

const addProduct = asyncHandler(async (req, res, next) => {
    const { image, productName, productPrice, description, productIncludes } = req.body;
  
    const product = await Product.create({
      image,
      productName,
      productPrice,
      description,
      productIncludes,
      owner: req.user._id
    });

    res.status(201).json({success: true, message: "Product creating success"})
  
  });

module.exports = { addProduct };