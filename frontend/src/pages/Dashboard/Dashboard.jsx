import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      This is a dashboard Page
      <Link to="budget">Budget</Link>
      <Link to="debt">Debt</Link>
      <Link to="goal">Goal</Link>
    </div>
  );
};

export default Dashboard;
