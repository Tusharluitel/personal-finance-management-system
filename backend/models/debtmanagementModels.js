const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const debtSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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
});
module.exports = mongoose.model("Debt", debtSchema);
