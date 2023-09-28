import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const DashboardData = () => {
  const [totalBudgetCount, setTotalBudgetCount] = useState(0);
  const [totalDebtCount, setTotalDebtCount] = useState(0);
  const [totalGoalCount, setTotalGoalCount] = useState(0);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/budget", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Calculate and set the total budget count
        setTotalBudgetCount(data.length);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };
    const fetchDebt = async () => {
      const response = await fetch("http://localhost:4000/api/debt", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setTotalDebtCount(json.length);
      }
    };
    const fetchGoal = async () => {
      const response = await fetch("http://localhost:4000/api/goal", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTotalGoalCount(data.length);
      }
    };
    fetchGoal();

    fetchDebt();

    fetchBudget();
  }, [user.token]);

  return (
    <div className="p-4">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper className="p-3" elevation={3}>
            <Typography variant="h6" component="div">
              Total Budget Created
            </Typography>
            <Typography variant="h4">{totalBudgetCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className="p-3" elevation={3}>
            <Typography variant="h6" component="div">
              Total Debt Created
            </Typography>
            <Typography variant="h4">{totalDebtCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className="p-3" elevation={3}>
            <Typography variant="h6" component="div">
              Total Goal Created
            </Typography>
            <Typography variant="h4">{totalGoalCount}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardData;
