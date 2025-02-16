const express = require("express");
const router = express.Router();
const {
  buyProducts,
  getAllBuyProducts,
  getBuyProduct,
} = require("../../controllers/users/userController");
const { protect, authorize } = require("../../middleware/authMiddleware");
const BuyProducts = require("../../models/BuyProducts");
const advancedResults = require("../../middleware/advancedResults");

router.route("/").post(protect, authorize("user"), buyProducts);
router
  .route("/")
  .get(
    advancedResults(BuyProducts, ["foodId", "productId"]),
    getAllBuyProducts
  );
router.route("/:id").get(getBuyProduct);

module.exports = router;
