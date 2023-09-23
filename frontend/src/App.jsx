import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Budget from "./pages/Budget/Budget";
import Goal from "./pages/Goal/Goal";
import Debt from "./pages/Debt/Debt";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Login />}></Route>
            <Route path="/budget" element={<Budget />} />
            <Route path="/goal" element={<Goal />} />
            <Route path="/debt" element={<Debt />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
