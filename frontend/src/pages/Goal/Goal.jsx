import React, { useEffect } from "react";
import GoalDetails from "./components/GoalDetails";
import GoalForm from "./components/GoalForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useGoalContext } from "../../hooks/useGoalContext";

const Goal = () => {
  const { goals, dispatch } = useGoalContext();
  const { user } = useAuthContext();

  // Add this useEffect to re-fetch goals when the state is updated
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/goal", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();
        dispatch({ type: "SET_GOALS", payload: json });
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    if (user) {
      fetchGoal();
    }
  }, [dispatch, user]);

  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        {goals !== null &&
          goals.map((goal) => <GoalDetails key={goal._id} goals={goal} />)}
      </div>
      <div className="w-2/4 p-4">
        <GoalForm />
      </div>
    </div>
  );
};

export default Goal;
