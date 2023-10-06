import { Button } from "@mui/material";
import React, { useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useGoalContext } from "../../../hooks/useGoalContext";
import EditGoalForm from "./EditGoalForm";

const GoalDetails = ({ goals }) => {
  const { user } = useAuthContext();
  const { goalDispatch } = useGoalContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "http://localhost:4000/api/goal/" + goals._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    if (response.ok) {
      goalDispatch({ type: "DELETE_GOAL", payload: json });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedGoal) => {
    setIsEditing(false);
    goalDispatch({ type: "UPDATE_GOAL", payload: updatedGoal });
  };

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
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClick}
          className="mt-4"
        >
          Delete
        </Button>
        {isEditing ? (
          <EditGoalForm goal={goals} onSave={handleSave} />
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

export default GoalDetails;
