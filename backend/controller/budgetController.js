const Budget = require("../models/budgetModels");
const mongoose = require("mongoose");

// GET all budget
const getBudgets = async (req, res) => {
  const budget = await Budget.find({}).sort({ createdAt: -1 });
  res.status(200).json(budget);
};

// GET a single budget
const getBudget = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such budget found" });
  }
  const budget = await Budget.findById(id);
  if (!budget) {
    return res.status(404).json({ error: "No such budget" });
  }
  res.status(200).json(budget);
};

// POST budget
const createBudgets = async (req, res) => {
  const { user, budgetname, totalamount, categories } = req.body;
  try {
    const budget = await Budget.create({
      user,
      budgetname,
      totalamount,
      categories,
    });
    res.status(200).json(budget);
  } catch (error) {
    res.status(400).json(error);
  }
};

// DELETE a buget
const deleteBudget = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such budget found" });
  }
  const budget = await Budget.findOneAndDelete({ _id: id });
  if (!budget) {
    return res.status(404).json({ error: "No such budget" });
  }
  res.status(200).json(budget);
};

// UPDATE actual expense
const updateActualExpenses = async (req, res) => {
  const { actualExpenses } = req.body;
  const budgetId = req.params.id;
  const categoryName = req.params.categoryName;

  try {
    const budget = await Budget.findById(budgetId);

    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }
    // Find the category by its name and update its actual expenses
    const categoryToUpdate = budget.categories.find(
      (category) => category.categoryName === categoryName
    );
    if (!categoryToUpdate) {
      return res.status(404).json({ error: "Category not found" });
    }
    categoryToUpdate.actualExpenses = actualExpenses;
    await budget.save();
    res.status(200).json(budget);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getBudget,
  getBudgets,
  createBudgets,
  deleteBudget,
  updateActualExpenses,
};
