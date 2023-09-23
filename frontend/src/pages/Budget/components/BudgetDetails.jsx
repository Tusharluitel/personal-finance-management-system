import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles

const BudgetDetails = ({ budget }) => {
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
                primary={`Category Name: ${category.categoryName}`}
                secondary={`Allocated Amount: $${category.allocatedAmount}, Actual Expenses: $${category.actualExpenses}`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="body2" color="textSecondary">
          Created: {new Date(budget.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BudgetDetails;
