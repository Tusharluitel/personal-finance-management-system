import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useDebtContext } from "../../../hooks/useDebtContext";
import EditDebtForm from "./EditDebtForm";

const DebtDetails = ({ debt }) => {
  const { user } = useAuthContext();
  const { debtDispatch } = useDebtContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("http://localhost:4000/api/debt/" + debt._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      debtDispatch({ type: "DELETE_DEBT", payload: json });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedBudget) => {
    setIsEditing(false);
    debtDispatch({ type: "UPDATE_DEBT", payload: updatedBudget });
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Creditor: {debt.creditor}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Balance: ${debt.balance}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Interest Rate: {debt.interestRate}%
        </Typography>
        <Typography variant="h6" gutterBottom>
          Minimum Payment: ${debt.minimumPayment}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Payment Plan:
        </Typography>
        <List>
          {debt.paymentPlan.map((payment, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Payment Date: ${new Date(
                  payment.paymentDate
                ).toLocaleDateString()}`}
                secondary={`Amount Paid: $${payment.amountPaid}`}
              />
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClick}
          className="mt-4"
        >
          Delete
        </Button>
        {isEditing ? (
          <EditDebtForm debt={debt} onSave={handleSave} />
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEditClick}
            className="mt-4"
          >
            Edit
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DebtDetails;
