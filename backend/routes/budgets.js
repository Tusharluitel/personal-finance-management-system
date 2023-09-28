const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {
  getBudget,
  getBudgets,
  createBudgets,
  deleteBudget,
  updateBudget,
  updateActualExpenses,
} = require("../controller/budgetController");

const router = express.Router();

router.use(requireAuth);

router.get("/", getBudgets);
router.get("/:id", getBudget);
router.patch("/:id", updateBudget);
router.post("/", createBudgets);
router.patch("/:id/category/:categoryName", updateActualExpenses);
router.delete("/:id", deleteBudget);

module.exports = router;
