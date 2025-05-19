import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const ExpenseContext = createContext();

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  const addExpense = async (expense) => {
    try {
      const res = await axios.post("/expenses", expense);
      setExpenses((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to add expense:", err);
      throw err;
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  const updateExpense = async (updatedExpense) => {
    try {
      const res = await axios.put(`/expenses/${updatedExpense._id}`, updatedExpense);
      setExpenses((prev) =>
        prev.map((exp) => (exp._id === updatedExpense._id ? res.data : exp))
      );
    } catch (err) {
      console.error("Failed to update expense:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, deleteExpense, updateExpense, setExpenses }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
