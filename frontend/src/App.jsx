import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Budget from "./pages/Budget/Budget";
import Goal from "./pages/Goal/Goal";
import Debt from "./pages/Debt/Debt";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUp from "./pages/Signup/Signup";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Dashboard />}></Route>
          <Route path="/budget" element={<Budget />} />
          <Route path="/goal" element={<Goal />} />
          <Route path="/debt" element={<Debt />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
