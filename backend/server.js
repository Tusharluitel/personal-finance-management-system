require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const budgetRoute = require("./routes/budgets");
const userRoute = require("./routes/users");
const goalRoute = require("./routes/goals");
const debtRoute = require("./routes/debts");
const app = express();

app.use(express.json());

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/budget", budgetRoute);
app.use("/api/users", userRoute);
app.use("/api/goal", goalRoute);
app.use("/api/debt", debtRoute);
// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log("DB connected & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
