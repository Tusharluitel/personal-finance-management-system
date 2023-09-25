const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const debtSchema = new Schema(
  {
    creditor: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    minimumPayment: {
      type: Number,
      required: true,
    },
    paymentPlan: [
      {
        paymentDate: {
          type: Date,
          required: true,
        },
        amountPaid: {
          type: Number,
          required: true,
        },
      },
    ],
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Debt", debtSchema);
