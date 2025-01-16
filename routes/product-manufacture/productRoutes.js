const express = require('express');
const router = express.Router();

const advancedResults = require('../../middleware/advancedResults');
const { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require('../../controllers/product-manufacture/productController');
const { protect, authorize } = require('../../middleware/authMiddleware');
const Product = require('../../models/Product');

router.route('/')
    .post(protect, authorize("productManufacture"), addProduct)
    .get(advancedResults(Product), getAllProducts);
router.route('/:id').get(getProduct).put(protect, authorize("productManufacture"), updateProduct).delete(protect, authorize("productManufacture"), deleteProduct);

module.exports = router;