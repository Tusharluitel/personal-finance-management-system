import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const DebtCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [annualInterestRate, setAnnualInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [payoffTime, setPayoffTime] = useState(null);

  const calculatePayoffTime = () => {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const loanTermInMonths = Math.ceil(loanAmount / monthlyPayment);
    const payoffTimeInMonths = Math.ceil(
      Math.log(
        monthlyPayment / (monthlyPayment - loanAmount * monthlyInterestRate)
      ) / Math.log(1 + monthlyInterestRate)
    );
    setPayoffTime(payoffTimeInMonths);
    setLoanAmount("");
    setAnnualInterestRate("");
    setMonthlyPayment("");
  };

  return (
    <div className="max-w-sm mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Debt Calculator</h2>
      <div className="mb-4">
        <TextField
          fullWidth
          type="number"
          label="Loan Amount"
          variant="outlined"
          className="mb-4"
          sx={{ marginBottom: "0.5rem" }}
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <TextField
          fullWidth
          type="number"
          label="Annual Interest Rate"
          variant="outlined"
          className="mb-4"
          sx={{ marginBottom: "0.5rem" }}
          value={annualInterestRate}
          onChange={(e) => setAnnualInterestRate(e.target.value)}
        />
        <TextField
          fullWidth
          type="number"
          label="Monthly Payment"
          variant="outlined"
          className="mb-4"
          value={monthlyPayment}
          onChange={(e) => setMonthlyPayment(e.target.value)}
        />
      </div>
      <Button
        variant="contained"
        onClick={calculatePayoffTime}
        className="mb-4"
      >
        Calculate
      </Button>
      {payoffTime && <p>It will take {payoffTime} months to clear the loan.</p>}
    </div>
  );
};

export default DebtCalculator;
