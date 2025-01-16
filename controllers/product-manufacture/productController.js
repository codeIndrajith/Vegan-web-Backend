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


// @desc     Get All Products
// @route    GET /api/v1/products
// @access   Public

const getAllProducts = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults);
})

// @desc     Get Single Products
// @route    GET /api/v1/products/:id
// @access   Public

const getProduct = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if(!product) {
        return next(new ErrorResponse("Product Not Found", 404))
    }
    
    res.status(200).json({success: true, data: product});
})

module.exports = { addProduct, getAllProducts, getProduct };