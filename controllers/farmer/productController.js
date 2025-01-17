const asyncHandler = require('../../middleware/async')
const ErrorResponse = require('../../utils/errorResponse');
const Product2 = require('../../models/Product2')


// @desc     Add Products in Product Manufacture
// @route    POST /api/v1/product
// @access   Private

const addProduct = asyncHandler(async (req, res, next) => {
    const { image, productName, productPrice, description, productIncludes } = req.body;
  
    const product = await Product2.create({
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
    const product2 = await Product2.findById(id);

    if(!product2) {
        return next(new ErrorResponse("Product Not Found", 404))
    }
    
    res.status(200).json({success: true, data: product2});
})

// @desc     Update Product
// @route    PUT /api/v1/products/:id
// @access   Private

const updateProduct = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const { image , productName, productPrice, description, productIncludes } = req.body
    const product2 = await Product2.findById(id);

    if(!product2) {
        return next(new ErrorResponse("Product Not Found", 404))
    }

    if(product2.owner.toString() !== req.user._id.toString()) {
        return next(new ErrorResponse(`You have no permission to update this product`,403))
    }

    product2.image = image || product2.image;
    product2.productName = productName || product2.productName;
    product2.productPrice = productPrice || product2.productPrice;
    product2.description = description || product2.description;
    product2.productIncludes = productIncludes || product2.productIncludes

    await product2.save();
    
    res.status(200).json({success: true, message: "Product Update success"});
})

// @desc     Delete Product
// @route    DELETE /api/v1/products/:id
// @access   Private

const deleteProduct = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const product2 = await Product2.findById(id);

    if(!product2) {
        return next(new ErrorResponse("Product Not Found", 404))
    }

    if(product2.owner.toString() !== req.user._id.toString()) {
        return next(new ErrorResponse(`You have no permission to delete this product`,403))
    }

    await product2.deleteOne();
    
    res.status(200).json({success: true, message: "Product Delete success"});
})

module.exports = { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct };