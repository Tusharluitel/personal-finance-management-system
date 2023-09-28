import { DebtContext } from "../context/DebtContext";
import { useContext } from "react";

export const useDebtContext = () => {
  const context = useContext(DebtContext);

  if (!context) {
    throw Error("useDebtContext must be used inside an DebtContextProvider");
  }
  return context;
};
