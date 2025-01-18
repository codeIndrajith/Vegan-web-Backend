const asyncHandler = require('../../middleware/async')
const ErrorResponse = require('../../utils/errorResponse');
const BuyProducts = require('../../models/BuyProducts');
const Product = require('../../models/Product');
const Product2 = require('../../models/Product2');
const Food = require('../../models/Food');


// @desc     Buy Products in users
// @route    POST /api/users/product
// @access   Private

const buyProducts = asyncHandler(async (req, res, next) => {
    const { qty } = req.body;
    let buyProduct = "";
    if(req.body.productId) {
        buyProduct = req.body.productId;
        const product = await Product.findById(buyProduct);
        if(!product) {
            return next(new ErrorResponse("Product not found", 404))
        }
        await BuyProducts.create({
            qty,
            productId: buyProduct,
            buyer: req.user._id
          });
    }  else if(req.body.product2Id) {
        buyProduct = req.body.product2Id;
        const product2 = await Product2.findById(buyProduct);
        if(!product2) {
            return next(new ErrorResponse("Product not found", 404))
        }
        await BuyProducts.create({
            qty,
            product2Id: buyProduct,
            buyer: req.user._id
          });
    } else if(req.body.foodId) {
        buyProduct = req.body.foodId;
        const food = await Food.findById(buyProduct);
        if(!food) {
            return next(new ErrorResponse("Food not found", 404))
        }
        await BuyProducts.create({
            qty,
            foodId: buyProduct,
            buyer: req.user._id
          });
    }

    res.status(201).json({success: true, message: "Product Buy success"})
  
  });

module.exports = { buyProducts };