const express = require('express');
const router = express.Router();

const advancedResults = require('../../middleware/advancedResults');
const { addShop, getAllShops, getShop, updateShop, deleteShop } = require('../../controllers/resturant-manufacture/shopController');
const { protect, authorize } = require('../../middleware/authMiddleware');
const Shop = require('../../models/Shop');

router.route('/')
    .post(protect, authorize("resturantManufacture"), addShop)
    .get(advancedResults(Shop, "foods"), getAllShops);
router.route('/:id').get(getShop).put(protect, authorize("resturantManufacture"), updateShop).delete(protect, authorize("resturantManufacture"), deleteShop);

module.exports = router;