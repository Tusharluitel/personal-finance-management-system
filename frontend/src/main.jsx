import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { BudgetContextProvider } from "./context/BudgetContext.jsx";
import { DebtContextProvider } from "./context/DebtContext.jsx";
import { GoalContextProvider } from "./context/GoalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BudgetContextProvider>
        <DebtContextProvider>
          <GoalContextProvider>
            <App />
          </GoalContextProvider>
        </DebtContextProvider>
      </BudgetContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
