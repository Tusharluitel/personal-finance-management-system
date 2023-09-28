import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditGoalForm = ({ goal, onSave }) => {
  const { user } = useAuthContext();
  const [goalData, setGoalData] = useState({
    goalName: goal.goalName,
    targetAmount: goal.targetAmount,
    currentAmount: goal.currentAmount,
    priority: goal.priority,
    dueDate: goal.dueDate,
    // Add other goal properties here
  });

  useEffect(() => {
    setGoalData({
      goalName: goal.goalName,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
      priority: goal.priority,
      dueDate: goal.dueDate,
      // Update other goal properties here
    });
  }, [goal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalData({ ...goalData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/goal/${goal._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(goalData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedGoal = await response.json();
      onSave(updatedGoal); // Notify the parent component about the update
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Edit Goal</h3>
      <TextField
        fullWidth
        label="Goal Name"
        name="goalName"
        value={goalData.goalName}
        onChange={handleInputChange}
        variant="outlined"
        className="mb-4"
      />
      <TextField
        fullWidth
        label="Target Amount"
        name="targetAmount"
        value={goalData.targetAmount}
        onChange={handleInputChange}
        variant="outlined"
        type="number"
        className="mb-4"
      />
      <TextField
        fullWidth
        label="Current Amount"
        name="currentAmount"
        value={goalData.currentAmount}
        onChange={handleInputChange}
        variant="outlined"
        type="number"
        className="mb-4"
      />
      <TextField
        fullWidth
        label="Priority"
        name="priority"
        value={goalData.priority}
        onChange={handleInputChange}
        variant="outlined"
        type="number"
        className="mb-4"
      />
      <TextField
        fullWidth
        label="Due Date"
        name="dueDate"
        value={goalData.dueDate}
        onChange={handleInputChange}
        variant="outlined"
        type="date"
        className="mb-4"
      />
      {/* Add other goal property fields here */}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default EditGoalForm;
