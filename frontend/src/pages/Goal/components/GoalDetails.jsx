import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles

const GoalDetails = ({ goals }) => {
  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Goal Name: {goals.goalName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Target Amount: ${goals.targetAmount}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Current Amount: ${goals.currentAmount}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Priority: {goals.priority}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Due Date: {new Date(goals.dueDate).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GoalDetails;
