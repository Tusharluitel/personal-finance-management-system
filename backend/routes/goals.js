const express = require("express");
const router = express.Router();
const {
  createGoal,
  getGoal,
  getGoals,
  updateGoalById,
  deleteGoal,
} = require("../controller/goalController");

router.get("/", getGoals);
router.get("/:id", getGoal);
router.post("/", createGoal);
router.delete("/:id", deleteGoal);
router.patch("/:id", updateGoalById);

module.exports = router;
