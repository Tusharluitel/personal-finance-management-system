import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Budget from "./pages/Budget/Budget";
import Goal from "./pages/Goal/Goal";
import Debt from "./pages/Debt/Debt";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUp from "./pages/Signup/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
import DebtCalculator from "./pages/Debt/components/DebtCalculator";
function App() {
  const { user } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/budget"
            element={user ? <Budget /> : <Navigate to="/login" />}
          />
          <Route
            path="/goal"
            element={user ? <Goal /> : <Navigate to="/login" />}
          />
          <Route
            path="/debt"
            element={user ? <Debt /> : <Navigate to="/login" />}
          />
          <Route
            path="/debt-calculator"
            element={user ? <DebtCalculator /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
