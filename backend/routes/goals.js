const express = require("express");

const {
  createGoal,
  getGoal,
  getGoals,
  updateGoalById,
  deleteGoal,
} = require("../controller/goalController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);

router.get("/", getGoals);
router.get("/:id", getGoal);
router.post("/", createGoal);
router.delete("/:id", deleteGoal);
router.patch("/:id", updateGoalById);

module.exports = router;
