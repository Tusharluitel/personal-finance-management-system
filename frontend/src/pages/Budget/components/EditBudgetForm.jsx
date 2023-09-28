import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditBudgetForm = ({ budget, onSave }) => {
  const { user } = useAuthContext();
  const [budgetData, setBudgetData] = useState({
    budgetname: budget.budgetname,
    totalamount: budget.totalamount,
    categories: [...budget.categories], // Copy the categories
  });

  useEffect(() => {
    setBudgetData({
      budgetname: budget.budgetname,
      totalamount: budget.totalamount,
      categories: [...budget.categories], // Copy the categories
    });
  }, [budget]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBudgetData({ ...budgetData, [name]: value });
  };

  const handleCategoryChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCategories = [...budgetData.categories];
    updatedCategories[index][name] = value;
    setBudgetData({ ...budgetData, categories: updatedCategories });
  };

  const handleAddCategory = () => {
    const newCategory = {
      categoryName: "",
      allocatedAmount: "",
      actualExpenses: "",
    };

    setBudgetData({
      ...budgetData,
      categories: [...budgetData.categories, newCategory],
    });
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = [...budgetData.categories];
    updatedCategories.splice(index, 1);

    setBudgetData({
      ...budgetData,
      categories: updatedCategories,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/budget/${budget._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(budgetData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedBudget = await response.json();
      onSave(updatedBudget); // Notify the parent component about the update
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Edit Budget</h3>
      <TextField
        fullWidth
        label="Budget Name"
        name="budgetname"
        value={budgetData.budgetname}
        onChange={handleInputChange}
        variant="outlined"
        className="mb-4"
      />
      <TextField
        fullWidth
        label="Total Amount"
        name="totalamount"
        value={budgetData.totalamount}
        onChange={handleInputChange}
        variant="outlined"
        type="number"
        className="mb-4"
      />
      <h4 className="text-xl font-semibold mb-2">Categories</h4>
      {budgetData.categories.map((category, index) => (
        <div key={index} className="mb-6">
          {" "}
          {/* Increased margin bottom */}
          <TextField
            fullWidth
            label={`Category Name ${index + 1}`}
            name="categoryName"
            value={category.categoryName}
            onChange={(e) => handleCategoryChange(index, e)}
            variant="outlined"
            className="mb-2"
          />
          <TextField
            fullWidth
            label={`Allocated Amount ${index + 1}`}
            name="allocatedAmount"
            value={category.allocatedAmount}
            onChange={(e) => handleCategoryChange(index, e)}
            variant="outlined"
            type="number"
            className="mb-2"
          />
          <TextField
            fullWidth
            label={`Actual Expenses ${index + 1}`}
            name="actualExpenses"
            value={category.actualExpenses}
            onChange={(e) => handleCategoryChange(index, e)}
            variant="outlined"
            type="number"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleRemoveCategory(index)}
            className="mb-2"
          >
            Remove Category
          </Button>
        </div>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleAddCategory}
        className="mb-2"
      >
        Add Category
      </Button>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default EditBudgetForm;
