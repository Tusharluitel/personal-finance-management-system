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
import { useBudgetContext } from "../../../hooks/useBudgetContext";
import EditBudgetForm from "./EditBudgetForm";

const BudgetDetails = ({ budget }) => {
  const { user } = useAuthContext();
  const { budgetDispatch } = useBudgetContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedBudget) => {
    setIsEditing(false);

    budgetDispatch({ type: "UPDATE_BUDGET", payload: updatedBudget });
  };

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "http://localhost:4000/api/budget/" + budget._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(response.json());
    const json = await response.json();
    if (response.ok) {
      budgetDispatch({ type: "DELETE_BUDGET", payload: json });
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Budget Title: {budget.budgetname}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Budget Amount: ${budget.totalamount}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Categories:
        </Typography>
        <List>
          {budget.categories.map((category, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Category Name: ${category.categoryName || "N/A"}`}
                secondary={`Allocated Amount: $${category.allocatedAmount}, Actual Expenses: $${category.actualExpenses}`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="body2" color="textSecondary">
          Created: {new Date(budget.createdAt).toLocaleDateString()}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClick}
          className="mt-4"
        >
          Delete
        </Button>
        {isEditing ? (
          <EditBudgetForm budget={budget} onSave={handleSave} />
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

export default BudgetDetails;
