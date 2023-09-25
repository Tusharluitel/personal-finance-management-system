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

const DebtDetails = ({ debt }) => {
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
      </CardContent>
    </Card>
  );
};

export default DebtDetails;
