import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditDebtForm = ({ debt, onSave }) => {
  const { user } = useAuthContext();
  const [debtData, setDebtData] = useState({
    creditor: debt.creditor,
    balance: debt.balance,
    interestRate: debt.interestRate,
    minimumPayment: debt.minimumPayment,
    paymentPlan: debt.paymentPlan.map((payment) => ({ ...payment })), // Copy paymentPlan
    // Add other debt properties here
  });

  useEffect(() => {
    setDebtData({
      creditor: debt.creditor,
      balance: debt.balance,
      interestRate: debt.interestRate,
      minimumPayment: debt.minimumPayment,
      paymentPlan: debt.paymentPlan.map((payment) => ({ ...payment })), // Copy paymentPlan
      // Update other debt properties here
    });
  }, [debt]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDebtData({ ...debtData, [name]: value });
  };

  const handlePaymentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPaymentPlan = [...debtData.paymentPlan];
    updatedPaymentPlan[index][name] = value;
    setDebtData({ ...debtData, paymentPlan: updatedPaymentPlan });
  };

  const handleAddPaymentPlan = () => {
    const newPayment = {
      paymentDate: "",
      amountPaid: "",
    };

    setDebtData({
      ...debtData,
      paymentPlan: [...debtData.paymentPlan, newPayment],
    });
  };

  const handleRemovePaymentPlan = (index) => {
    const updatedPaymentPlan = [...debtData.paymentPlan];
    updatedPaymentPlan.splice(index, 1);

    setDebtData({
      ...debtData,
      paymentPlan: updatedPaymentPlan,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/debt/${debt._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(debtData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedDebt = await response.json();
      onSave(updatedDebt); // Notify the parent component about the update
    } catch (error) {
      console.error("Error updating debt:", error);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Edit Debt</h3>
      <TextField
        fullWidth
        label="Creditor"
        name="creditor"
        value={debtData.creditor}
        onChange={handleInputChange}
        variant="outlined"
        className="mb-4"
      />
      <TextField
        fullWidth
        label="Balance"
        name="balance"
        value={debtData.balance}
        onChange={handleInputChange}
        variant="outlined"
        type="number"
        className="mb-4"
      />
      <TextField
        fullWidth
        label="Interest Rate"
        name="interestRate"
        value={debtData.interestRate}
        onChange={handleInputChange}
        variant="outlined"
        type="number"
        className="mb-4"
      />
      <TextField
        fullWidth
        label="Minimum Payment"
        name="minimumPayment"
        value={debtData.minimumPayment}
        onChange={handleInputChange}
        variant="outlined"
        type="number"
        className="mb-4"
      />
      <h4 className="text-xl font-semibold mb-2">Payment Plan</h4>
      {debtData.paymentPlan.map((payment, index) => (
        <div key={index} className="mb-4">
          <TextField
            fullWidth
            label={`Payment Date ${index + 1}`}
            name="paymentDate"
            value={payment.paymentDate}
            onChange={(e) => handlePaymentChange(index, e)}
            variant="outlined"
            type="date"
            className="mb-2"
          />
          <TextField
            fullWidth
            label={`Amount Paid ${index + 1}`}
            name="amountPaid"
            value={payment.amountPaid}
            onChange={(e) => handlePaymentChange(index, e)}
            variant="outlined"
            type="number"
            className="mb-2"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleRemovePaymentPlan(index)}
            className="mb-2"
          >
            Remove Payment
          </Button>
        </div>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleAddPaymentPlan}
        className="mb-2"
      >
        Add Payment
      </Button>
      {/* Add other debt property fields here */}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default EditDebtForm;
