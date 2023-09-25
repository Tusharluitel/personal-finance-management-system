const { default: mongoose } = require("mongoose");
const Goal = require("../models/goalModels");

// GET all goals
const getGoals = async (req, res) => {
  const user_id = req.user._id;
  const goals = await Goal.find({}).sort({ createdAt: -1 });
  res.status(200).json(goals);
};

// GET a single goal

const getGoal = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such goal" });
  }
  const goal = await Goal.findById(id);
  if (!goal) {
    return res.status(400).json({ error: "No such goal found" });
  }
  res.status(200).json(goal);
};

// CREATE a goal
const createGoal = async (req, res) => {
  const { goalName, targetAmount, currentAmount, priority, dueDate } = req.body;
  try {
    const user_id = req.user._id;
    const goal = await Goal.create({
      goalName,
      targetAmount,
      currentAmount,
      priority,
      dueDate,
      user_id,
    });
    res.status(200).json(goal);
  } catch (error) {
    res.status(400).json({ error: "Failed to create goal" });
  }
};

// DELETE a goal

const deleteGoal = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such goal" });
  }
  const goal = await Goal.findOneAndDelete({ _id: id });
  if (!goal) {
    return res.status(400).json({ error: "No goal found" });
  }
  res.status(200).json(goal);
};

// Update Goal
const updateGoalById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such goal" });
  }
  const { goalName, targetAmount, currentAmount, priority, dueDate } = req.body;

  try {
    const goal = await Goal.findByIdAndUpdate(
      id,
      {
        goalName,
        targetAmount,
        currentAmount,
        priority,
        dueDate,
      },
      { new: true }
    );

    if (!goal) {
      return res.status(404).json({ error: "Goal not found." });
    }

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the goal." });
  }
};

module.exports = {
  createGoal,
  getGoal,
  getGoals,
  deleteGoal,
  updateGoalById,
};
