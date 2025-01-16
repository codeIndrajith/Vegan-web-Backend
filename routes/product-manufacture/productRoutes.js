const express = require('express');
const router = express.Router();

const advancedResults = require('../../middleware/advancedResults');
const { addProduct, getAllProducts, getProduct } = require('../../controllers/product-manufacture/productController');
const { protect, authorize } = require('../../middleware/authMiddleware');
const Product = require('../../models/Product');

router.route('/')
    .post(protect, authorize("productManufacture"), addProduct)
    .get(advancedResults(Product), getAllProducts);
router.route('/:id').get(getProduct)

module.exports = router;