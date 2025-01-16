const express = require('express');
const { addProduct } = require('../../controllers/product-manufacture/productController');
const { protect, authorize } = require('../../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, authorize("productManufacture"), addProduct);

module.exports = router;