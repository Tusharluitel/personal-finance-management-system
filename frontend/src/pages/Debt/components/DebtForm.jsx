import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useAuthContext } from "../../../hooks/useAuthContext";

const DebtForm = () => {
  const [creditor, setCreditor] = useState("");
  const [balance, setBalance] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [minimumPayment, setMinimumPayment] = useState("");
  const [paymentPlan, setPaymentPlan] = useState([]);
  const [paymentDate, setPaymentDate] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const { user } = useAuthContext();
  const handlePaymentPlanAdd = () => {
    if (paymentDate && amountPaid) {
      const newPayment = {
        paymentDate,
        amountPaid,
      };

      setPaymentPlan([...paymentPlan, newPayment]);

      // Clear payment input fields
      setPaymentDate("");
      setAmountPaid("");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for submission
    const debtData = {
      creditor,
      balance,
      interestRate,
      minimumPayment,
      paymentPlan,
    };

    // Perform the POST request to your API here
    try {
      const response = await fetch("http://localhost:4000/api/debt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(debtData),
      });

      if (response.ok) {
        // Handle success
        console.log("Debt posted successfully!");
        // Optionally, reset the form
        setCreditor("");
        setBalance("");
        setInterestRate("");
        setMinimumPayment("");
        setPaymentPlan([]);
      } else {
        // Handle server-side validation errors or other issues
        const responseData = await response.json();
        console.error("Failed to post debt:", responseData.error);
      }
    } catch (error) {
      // Handle client-side errors
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Debt</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="creditor" className="block mb-1">
            Creditor:
          </label>
          <TextField
            type="text"
            id="creditor"
            value={creditor}
            onChange={(e) => setCreditor(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mb-4">
          <label htmlFor="balance" className="block mb-1">
            Balance:
          </label>
          <TextField
            type="number"
            id="balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mb-4">
          <label htmlFor="interestRate" className="block mb-1">
            Interest Rate:
          </label>
          <TextField
            type="number"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mb-4">
          <label htmlFor="minimumPayment" className="block mb-1">
            Minimum Payment:
          </label>
          <TextField
            type="number"
            id="minimumPayment"
            value={minimumPayment}
            onChange={(e) => setMinimumPayment(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Payment Plan:</label>
          <div className="flex items-center space-x-2">
            <TextField
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
            <TextField
              type="number"
              placeholder="Amount Paid"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
            />
            <Button
              type="button"
              variant="outlined"
              color="primary"
              onClick={handlePaymentPlanAdd}
            >
              Add Payment
            </Button>
          </div>
          <List>
            {paymentPlan.map((payment, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Date: ${payment.paymentDate}, Amount Paid: ${payment.amountPaid}`}
                />
              </ListItem>
            ))}
          </List>
        </div>
        <div className="mt-4">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DebtForm;
