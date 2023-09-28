import { createContext, useReducer } from "react";

export const DebtContext = createContext();

export const debtReducer = (state, action) => {
  switch (action.type) {
    case "SET_DEBTS":
      return {
        debts: action.payload,
      };
    case "CREATE_DEBT":
      return {
        debts: [action.payload, ...state.debts],
      };
    case "DELETE_DEBT":
      return {
        debts: state.debts.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_DEBT":
      const updatedDebtIndex = state.debts.findIndex(
        (b) => b._id === action.payload._id
      );
      if (updatedDebtIndex !== -1) {
        state.debts[updatedDebtIndex] = action.payload;
      }
      return { debts: [...state.debts] };
    default:
      return state;
  }
};

export const DebtContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(debtReducer, {
    debts: null,
  });

  return (
    <DebtContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DebtContext.Provider>
  );
};
