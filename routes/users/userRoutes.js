const express = require('express');
const router = express.Router();
const { buyProducts } = require('../../controllers/users/userController');
const { protect, authorize } = require('../../middleware/authMiddleware')

router.route('/').post(protect, authorize("user"), buyProducts)

module.exports = router;