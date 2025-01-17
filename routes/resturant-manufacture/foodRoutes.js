const express = require('express');
const router = express.Router();

const advancedResults = require('../../middleware/advancedResults');
const { addFood, getAllFoods, getFood, updateFood, deleteFood } = require('../../controllers/resturant-manufacture/foodController');
const { protect, authorize } = require('../../middleware/authMiddleware');
const Food = require('../../models/Food');

router.route('/')
    .post(protect, authorize("resturantManufacture"), addFood)
    .get(advancedResults(Food), getAllFoods);
router.route('/:id').get(getFood).put(protect, authorize("resturantManufacture"), updateFood).delete(protect, authorize("resturantManufacture"), deleteFood);

module.exports = router;