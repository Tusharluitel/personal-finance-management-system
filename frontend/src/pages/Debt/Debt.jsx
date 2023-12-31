import React, { useEffect, useState } from "react";
import DebtDetails from "./components/DebtDetails";
import DebtForm from "./components/DebtForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDebtContext } from "../../hooks/useDebtContext";

const Debt = () => {
  const { debts, dispatch } = useDebtContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchDebt = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/debt", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const json = await response.json();
        if (response.ok) {
          if (response.ok) {
            dispatch({ type: "SET_DEBTS", payload: json });
          }
        }

        console.log("Fetched successfully");
      } catch (error) {
        console.error("Error fetching debt:", error);
      }
    };

    fetchDebt();
  }, [dispatch, user]);

  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        {debts !== null &&
          debts.map((debt) => <DebtDetails key={debt._id} debt={debt} />)}
      </div>
      <div className="w-2/4 p-4">
        <DebtForm />
      </div>
    </div>
  );
};

export default Debt;
