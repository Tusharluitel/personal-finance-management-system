import { createContext, useReducer } from "react";

export const BudgetContext = createContext();

export const budgetReducer = (state, action) => {
  switch (action.type) {
    case "SET_BUDGETS":
      return {
        budgets: action.payload,
      };
    case "CREATE_BUDGET":
      return {
        budgets: [action.payload, ...state.budgets],
      };
    case "DELETE_BUDGET":
      return {
        budgets: state.budgets.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_BUDGET":
      const updatedBudgetIndex = state.budgets.findIndex(
        (b) => b._id === action.payload._id
      );
      if (updatedBudgetIndex !== -1) {
        state.budgets[updatedBudgetIndex] = action.payload;
      }
      return { budgets: [...state.budgets] };
    default:
      return state;
  }
};

export const BudgetContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, {
    budgets: null,
  });

  return (
    <BudgetContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};
