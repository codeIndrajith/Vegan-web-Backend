const express = require('express');
const router = express.Router();

const advancedResults = require('../../middleware/advancedResults');
const { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require('../../controllers/farmer/productController');
const { protect, authorize } = require('../../middleware/authMiddleware');
const Product2 = require('../../models/Product2');

router.route('/')
    .post(protect, authorize("farmer"), addProduct)
    .get(advancedResults(Product2), getAllProducts);
router.route('/:id').get(getProduct).put(protect, authorize("farmer"), updateProduct).delete(protect, authorize("farmer"), deleteProduct);

module.exports = router;