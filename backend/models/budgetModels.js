const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    budgetname: {
      type: String,
      required: true,
    },
    totalamount: {
      type: Number,
      required: true,
    },
    categories: [
      {
        categoryName: String,
        allocatedAmount: Number,
        actualExpenses: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);
