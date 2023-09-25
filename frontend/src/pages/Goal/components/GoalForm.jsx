import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuthContext } from "../../../hooks/useAuthContext";

const GoalForm = () => {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { user } = useAuthContext();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for submission
    const goalData = {
      goalName,
      targetAmount,
      currentAmount,
      priority,
      dueDate,
    };

    // Perform the POST request to your API here
    try {
      const response = await fetch("http://localhost:4000/api/goal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(goalData),
      });

      if (response.ok) {
        // Handle success
        console.log("Goal posted successfully!");
        // Optionally, reset the form
        setGoalName("");
        setTargetAmount("");
        setCurrentAmount("");
        setPriority("");
        setDueDate("");
      } else {
        // Handle server-side validation errors or other issues
        const responseData = await response.json();
        console.error("Failed to post goal:", responseData.error);
      }
    } catch (error) {
      // Handle client-side errors
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create a New Goal</h2>
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
          Submit
        </Button>
      </form>
    </div>
  );
};

export default GoalForm;
