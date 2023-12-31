const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetSchema = new Schema(
  {
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
    user_id: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);
