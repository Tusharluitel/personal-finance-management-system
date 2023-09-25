import React, { useEffect, useState } from "react";
import DebtDetails from "./components/DebtDetails";
import DebtForm from "./components/DebtForm";
import { useAuthContext } from "../../hooks/useAuthContext";
const Debt = () => {
  const [debt, setDebt] = useState("");
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchDebt = async () => {
      const response = await fetch("http://localhost:4000/api/debt", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setDebt(json);
        console.log("Fetched sucessfully");
      }
    };
    fetchDebt();
  }, []);

  return (
    <div>
      <div>
        {debt && debt.map((debt) => <DebtDetails key={debt._id} debt={debt} />)}
      </div>
      <div>
        <DebtForm />
      </div>
    </div>
  );
};

export default Debt;
