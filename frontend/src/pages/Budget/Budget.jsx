import React, { useEffect, useState } from "react";

import BudgetDetails from "./components/BudgetDetails";
import BudgetForm from "./components/BudgetForm";
const Budget = () => {
  const [budgets, setBudgets] = useState("");
  useEffect(() => {
    const fetchBudget = async () => {
      const response = await fetch("http://localhost:4000/api/budget");
      const json = await response.json();
      if (response.ok) {
        setBudgets(json);
        console.log("Fetched sucessfully");
      }
    };
    fetchBudget();
  }, []);

  return (
    <div>
      <div>
        {budgets &&
          budgets.map((budget) => (
            <BudgetDetails key={budget._id} budget={budget} />
          ))}
      </div>
      <div>
        <BudgetForm />
      </div>
    </div>
  );
};

export default Budget;
