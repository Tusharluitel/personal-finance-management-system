import { createContext, useReducer } from "react";

export const GoalContext = createContext();

export const goalReducer = (state, action) => {
  switch (action.type) {
    case "SET_GOALS":
      return {
        goals: action.payload,
      };
    case "CREATE_GOAL":
      return {
        goals: [action.payload, ...state.goals],
      };
    case "DELETE_GOAL":
      return {
        goals: state.goals.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_GOAL":
      const updatedGoalIndex = state.goals.findIndex(
        (b) => b._id === action.payload._id
      );
      if (updatedGoalIndex !== -1) {
        state.goals[updatedGoalIndex] = action.payload;
      }
      return { goals: [...state.goals] };
    default:
      return state;
  }
};

export const GoalContextProvider = ({ children }) => {
  const [state, goalDispatch] = useReducer(goalReducer, {
    goals: null,
  });

  return (
    <GoalContext.Provider value={{ ...state, goalDispatch }}>
      {children}
    </GoalContext.Provider>
  );
};
