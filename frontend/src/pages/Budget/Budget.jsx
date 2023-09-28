import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import BudgetDetails from "./components/BudgetDetails";
import BudgetForm from "./components/BudgetForm";
import { useBudgetContext } from "../../hooks/useBudgetContext";

const Budget = () => {
  const { user } = useAuthContext();
  const { budgets, dispatch } = useBudgetContext();

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/budget", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_BUDGETS", payload: json });
        }

        console.log("Fetched successfully");
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };
    if (user) {
      fetchBudget();
    }
  }, [dispatch, user]);

  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        {budgets !== null &&
          budgets.map((budget) => (
            <BudgetDetails key={budget._id} budget={budget} />
          ))}
      </div>
      <div className="w-2/4 p-4">
        <BudgetForm />
      </div>
    </div>
  );
};

export default Budget;
