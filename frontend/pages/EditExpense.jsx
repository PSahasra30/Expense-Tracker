
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    time: "",
    type: "expense",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch existing expense by ID
    const fetchExpense = async () => {
      try {
        // const res = await axios.get(`http://localhost:5000/api/expenses/${id}`);
        const res = await axios.get(`http://localhost:5000/api/expenses/${id}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      });

        const data = res.data;

        setFormData({
          title: data.title || "",
          amount: data.amount || "",
          category: data.category || "",
          date: data.date || "",
          time: data.time || "",
          type: data.type || "expense",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching expense:", err);
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // await axios.put(`http://localhost:5000/api/expenses/${id}`, {
      //   ...formData,
      //   amount: Number(formData.amount),
      // });
      await axios.put(
        `http://localhost:5000/api/expenses/${id}`,
        {
          ...formData,
          amount: Number(formData.amount),
        },
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
    );


      alert("Expense updated successfully ✅");
      navigate("/transactions");
    } catch (err) {
      alert("Update failed ❌");
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="add-expense-container">
      <h2 className="form-title">Edit Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
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
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Update Expense</button>
      </form>
    </div>
  );
};

export default EditExpense;


