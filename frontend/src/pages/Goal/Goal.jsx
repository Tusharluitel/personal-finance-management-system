import React, { useEffect, useState } from "react";
import GoalDetails from "./components/GoalDetails";
import GoalForm from "./components/GoalForm";

const Goal = () => {
  const [goals, setGoals] = useState("");
  useEffect(() => {
    const fetchBudget = async () => {
      const response = await fetch("http://localhost:4000/api/goal");
      const json = await response.json();
      if (response.ok) {
        setGoals(json);
        console.log("Fetched sucessfully");
      }
    };
    fetchBudget();
  }, []);

  return (
    <div>
      <div>
        {goals &&
          goals.map((goal) => <GoalDetails key={goal._id} goals={goal} />)}
      </div>
      <div>
        <GoalForm />
      </div>
    </div>
  );
};

export default Goal;
