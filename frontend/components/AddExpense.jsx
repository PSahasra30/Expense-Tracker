import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExpenseContext } from "../src/context/ExpenseContext"; // Adjust path if needed
import "./AddExpense.css";

const AddExpense = () => {
  const { addExpense } = useExpenseContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    time: "",
    type: "expense",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      amount: Number(formData.amount), // Convert amount to Number
    };

    console.log("Submitting expense:", finalData); // Debug log

    try {
      await addExpense(finalData); // Send to backend
      alert(`${formData.type === "income" ? "Income" : "Expense"} added successfully!`);
      navigate("/dashboard");      // Redirect after success
    } catch (err) {
      alert("Failed to add expense. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="add-expense-container">
      <h2 className="form-title">
        Add {formData.type === "income" ? "Income" : "Expense"}
      </h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="expense">➖ Expense</option>
            <option value="income">➕ Income</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Salary">Salary</option>
            <option value="Investment">Investment</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Add {formData.type === "income" ? "Income" : "Expense"}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
