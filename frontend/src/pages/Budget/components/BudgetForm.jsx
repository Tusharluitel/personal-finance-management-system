import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles

const BudgetForm = () => {
  const [budgetname, setBudgetname] = useState("");
  const [totalamount, setTotalamount] = useState("");
  const [categoryname, setCategoryname] = useState("");
  const [allocatedAmount, setAllocatedAmount] = useState("");
  const [actualExpenses, setActualExpenses] = useState("");
  const [categories, setCategories] = useState([]);

  const handleCategoryAdd = () => {
    if (categoryname && allocatedAmount && actualExpenses) {
      const newCategory = {
        categoryname,
        allocatedAmount,
        actualExpenses,
      };

      setCategories([...categories, newCategory]);

      // Clear category input fields
      setCategoryname("");
      setAllocatedAmount("");
      setActualExpenses("");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for submission
    const budgetData = {
      budgetname,
      totalamount,
      categories,
    };

    // Perform the POST request to your API here
    try {
      const response = await fetch("http://localhost:4000/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(budgetData),
      });

      if (response.ok) {
        // Handle success
        console.log("Budget posted successfully!");
        // Optionally, reset the form
        setBudgetname("");
        setTotalamount("");
        setCategories([]);
      } else {
        // Handle server-side validation errors or other issues
        const responseData = await response.json();
        console.error("Failed to post budget:", responseData.error);
      }
    } catch (error) {
      // Handle client-side errors
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Budget</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="budgetname" className="block mb-1">
            Budget Name:
          </label>
          <TextField
            type="text"
            id="budgetname"
            value={budgetname}
            onChange={(e) => setBudgetname(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mb-4">
          <label htmlFor="totalamount" className="block mb-1">
            Total Amount:
          </label>
          <TextField
            type="number"
            id="totalamount"
            value={totalamount}
            onChange={(e) => setTotalamount(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryname" className="block mb-1">
            Category Name:
          </label>
          <TextField
            type="text"
            id="categoryname"
            value={categoryname}
            onChange={(e) => setCategoryname(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mb-4">
          <label htmlFor="allocatedAmount" className="block mb-1">
            Allocated Amount:
          </label>
          <TextField
            type="number"
            id="allocatedAmount"
            value={allocatedAmount}
            onChange={(e) => setAllocatedAmount(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mb-4">
          <label htmlFor="actualExpenses" className="block mb-1">
            Actual Expenses:
          </label>
          <TextField
            type="number"
            id="actualExpenses"
            value={actualExpenses}
            onChange={(e) => setActualExpenses(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mb-4">
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={handleCategoryAdd}
          >
            Add Category
          </Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Categories:</h3>
          <List>
            {categories.map((category, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${category.categoryname} - Allocated: ${category.allocatedAmount}, Actual: ${category.actualExpenses}`}
                />
              </ListItem>
            ))}
          </List>
        </div>
        <div className="mt-4">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;
