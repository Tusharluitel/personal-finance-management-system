const Debt = require("../models/debtmanagementModels");
const mongoose = require("mongoose");

// GET all debt
const getDebts = async (req, res) => {
  const debt = await Debt.find({}).sort({ createdAt: -1 });
  res.status(200).json(debt);
};

// GET a single debt

const getDebt = async (req, res) => {
  const { id } = req.param;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such debt found" });
  }
  const debt = await Debt.findById(id);
  res.status(200).json(debt);
};

// CREATE a debt

const createDebt = async (req, res) => {
  const { user, creditor, balance, interestRate, minimumPayment, paymentPlan } =
    req.body;

  try {
    const debt = await Debt.create({
      user,
      creditor,
      balance,
      interestRate,
      minimumPayment,
      paymentPlan,
    });

    res.status(201).json(debt);
  } catch (error) {
    res.status(400).json(error);
  }
};

// DELETE DEBT
const deleteDebt = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Debt not found" });
  }
  try {
    const deletedDebt = await Debt.findByIdAndRemove(id);
    if (!deletedDebt) {
      return res.status(404).json({ message: "Debt not found" });
    }
    res.status(200).json({ message: "Debt deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update DEBT
const updateDebt = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const debt = await Debt.findByIdAndUpdate(id, updates, { new: true });
    if (!debt) {
      return res.status(404).json({ message: "Debt not found" });
    }
    res.status(200).json(debt);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createDebt, getDebt, getDebts, deleteDebt, updateDebt };
