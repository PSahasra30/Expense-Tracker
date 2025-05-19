


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useExpenseContext } from "../src/context/ExpenseContext";
// import { useNavigate } from "react-router-dom";
// import "./Transactions.css";

// const Transactions = () => {
//   const { expenses, setExpenses } = useExpenseContext();
//   const [loading, setLoading] = useState(true);
//   const [filterType, setFilterType] = useState("");
//   const [filterCategory, setFilterCategory] = useState("");
//   const [filterDate, setFilterDate] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/expenses");
//         setExpenses(res.data);
//       } catch (err) {
//         console.error("Error fetching expenses:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExpenses();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this expense?")) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/expenses/${id}`);
//       setExpenses((prev) => prev.filter((exp) => exp._id !== id));
//       alert("Expense deleted successfully!");
//     } catch (err) {
//       console.error("Error deleting expense:", err);
//       alert("Failed to delete expense.");
//     }
//   };

//   const handleEdit = (expense) => {
//     navigate(`/edit/${expense._id}`, { state: { expense } });
//   };

//   const filteredExpenses = expenses
//     .filter((exp) => (filterType ? exp.type === filterType : true))
//     .filter((exp) => (filterCategory ? exp.category === filterCategory : true))
//     .filter((exp) => (filterDate ? exp.date === filterDate : true))
//     .sort((a, b) => {
//       switch (sortOption) {
//         case "latest":
//           return new Date(b.date) - new Date(a.date);
//         case "oldest":
//           return new Date(a.date) - new Date(b.date);
//         case "amount_high":
//           return b.amount - a.amount;
//         case "amount_low":
//           return a.amount - b.amount;
//         default:
//           return 0;
//       }
//     });

//   const categories = [...new Set(expenses.map((exp) => exp.category))];

//   return (
//     <div className="transactions-page">
//       <h2>All Transactions</h2>

//       {/* Filters */}
//       <div className="filters">
//         <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
//           <option value="">All Types</option>
//           <option value="income">Income</option>
//           <option value="expense">Expense</option>
//         </select>

//         <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
//           <option value="">All Categories</option>
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>

//         <input
//           type="date"
//           value={filterDate}
//           onChange={(e) => setFilterDate(e.target.value)}
//         />

//         <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
//           <option value="">Sort By</option>
//           <option value="latest">Latest First</option>
//           <option value="oldest">Oldest First</option>
//           <option value="amount_high">Amount High to Low</option>
//           <option value="amount_low">Amount Low to High</option>
//         </select>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : filteredExpenses.length === 0 ? (
//         <p>No transactions found.</p>
//       ) : (
//         <div className="transactions-list">
//           {filteredExpenses.map((exp) => (
//             <div key={exp._id} className={`transaction-card ${exp.type}`}>
//               <div className="transaction-header">
//                 <h4>{exp.title}</h4>
//                 <span className="amount">₹{exp.amount}</span>
//               </div>
//               <p className="category">{exp.category}</p>
//               <p className="datetime">
//                 {exp.date} at {exp.time}
//               </p>
//               <p className="type">
//                 {exp.type === "income" ? "Income" : "Expense"}
//               </p>

//               <div className="transaction-buttons">
//                 <button onClick={() => handleEdit(exp)} className="edit-btn">✏️ Edit</button>
//                 <button onClick={() => handleDelete(exp._id)} className="delete-btn">🗑️ Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Transactions;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { useExpenseContext } from "../src/context/ExpenseContext";
import { useNavigate } from "react-router-dom";
import "./Transactions.css";

const Transactions = () => {
  const { expenses, setExpenses } = useExpenseContext();
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExpenses(res.data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
        alert("Failed to load expenses. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [setExpenses]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
      alert("Expense deleted successfully!");
    } catch (err) {
      console.error("Error deleting expense:", err);
      alert("Failed to delete expense.");
    }
  };

  const handleEdit = (expense) => {
    navigate(`/edit/${expense._id}`, { state: { expense } });
  };

  const filteredExpenses = expenses
    .filter((exp) => (filterType ? exp.type === filterType : true))
    .filter((exp) => (filterCategory ? exp.category === filterCategory : true))
    .filter((exp) => (filterDate ? exp.date === filterDate : true))
    // .sort((a, b) => {
    //   switch (sortOption) {
    //     case "latest":
    //       return new Date(b.date) - new Date(a.date);
    //     case "oldest":
    //       return new Date(a.date) - new Date(b.date);
    //     case "amount_high":
    //       return b.amount - a.amount;
    //     case "amount_low":
    //       return a.amount - b.amount;
    //     default:
    //       return 0;
    //   }
    .sort((a, b) => {
    const dateA = new Date(a.date || "1970-01-01");
    const dateB = new Date(b.date || "1970-01-01");

    switch (sortOption) {
      case "latest":
        return dateB - dateA;
      case "oldest":
        return dateA - dateB;
      case "amount_high":
        return b.amount - a.amount;
      case "amount_low":
        return a.amount - b.amount;
      default:
        return 0;
    }
});


  const categories = [...new Set(expenses.map((exp) => exp.category))];

  return (
    <div className="transactions-page">
      <h2>All Transactions</h2>

      {/* Filters */}
      <div className="filters">
        <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Salary">Salary</option>
          <option value="Investment">Investment</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
          {categories
            .filter((cat) => !["Food", "Transport", "Salary", "Investment", "Entertainment", "Other"].includes(cat))
            .map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
          <option value="">Sort By</option>
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="amount_high">Amount High to Low</option>
          <option value="amount_low">Amount Low to High</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredExpenses.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="transactions-list">
          {filteredExpenses.map((exp) => (
            <div key={exp._id} className={`transaction-card ${exp.type}`}>
              <div className="transaction-header">
                <h4>{exp.title}</h4>
                <span className="amount">₹{exp.amount}</span>
              </div>
              <p className="category">{exp.category}</p>
              <p className="datetime">
                {exp.date} at {exp.time}
              </p>
              <p className="type">{exp.type === "income" ? "Income" : "Expense"}</p>

              <div className="transaction-buttons">
                <button onClick={() => handleEdit(exp)} className="edit-btn">
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(exp._id)} className="delete-btn">
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
