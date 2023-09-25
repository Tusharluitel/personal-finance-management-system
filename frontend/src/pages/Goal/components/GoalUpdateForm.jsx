import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const GoalUpdateForm = ({ goal, onUpdate }) => {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Populate the form fields with existing goal data when the component mounts
  useEffect(() => {
    setGoalName(goal.goalName);
    setTargetAmount(goal.targetAmount);
    setCurrentAmount(goal.currentAmount);
    setPriority(goal.priority);
    setDueDate(goal.dueDate);
  }, [goal]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for submission
    const updatedGoal = {
      goalName,
      targetAmount,
      currentAmount,
      priority,
      dueDate,
    };

    // Perform the PATCH request to update the goal
    try {
      const response = await fetch(
        `http://localhost:4000/api/goal/${goal._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedGoal),
        }
      );

      if (response.ok) {
        // Handle success
        console.log("Goal updated successfully!");
        // Optionally, trigger an update callback
        onUpdate(updatedGoal);
      } else {
        // Handle server-side validation errors or other issues
        const responseData = await response.json();
        console.error("Failed to update goal:", responseData.error);
      }
    } catch (error) {
      // Handle client-side errors
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Goal</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <TextField
            label="Goal Name"
            variant="outlined"
            fullWidth
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Target Amount"
            variant="outlined"
            fullWidth
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Current Amount"
            variant="outlined"
            fullWidth
            type="number"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Priority"
            variant="outlined"
            fullWidth
            type="number"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Due Date"
            variant="outlined"
            fullWidth
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default GoalUpdateForm;
