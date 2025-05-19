// import React, { useEffect, useState } from "react";
// import { useExpenseContext } from "../src/context/ExpenseContext";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import "./Visuals.css";

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

// const Visuals = () => {
//   const { expenses } = useExpenseContext();
//   const [summary, setSummary] = useState({
//     income: 0,
//     expense: 0,
//     net: 0,
//     mostCategory: "",
//     avgPerDay: 0,
//   });

//   // NEW STATE FOR MONTH/YEAR FILTER
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [monthlyExpense, setMonthlyExpense] = useState(0);

//   useEffect(() => {
//     if (!expenses.length) return;

//     const income = expenses
//       .filter((e) => e.type === "income")
//       .reduce((sum, e) => sum + Number(e.amount), 0);

//     const expense = expenses
//       .filter((e) => e.type === "expense")
//       .reduce((sum, e) => sum + Number(e.amount), 0);

//     const net = income - expense;

//     const categoryMap = {};
//     expenses.forEach((e) => {
//       if (e.type === "expense") {
//         categoryMap[e.category] = (categoryMap[e.category] || 0) + Number(e.amount);
//       }
//     });

//     const mostCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

//     const uniqueDates = new Set(expenses.map((e) => e.date));
//     const avgPerDay = (income + expense) / uniqueDates.size;

//     setSummary({ income, expense, net, mostCategory, avgPerDay });
//   }, [expenses]);

//   // COMPUTE FILTERED MONTHLY EXPENSE BASED ON SELECTED MONTH + YEAR
//   useEffect(() => {
//     if (!selectedMonth || !selectedYear) return;
//     const filtered = expenses.filter((e) => {
//       const d = new Date(e.date);
//       return (
//         d.getMonth() + 1 === Number(selectedMonth) &&
//         d.getFullYear() === Number(selectedYear) &&
//         e.type === "expense"
//       );
//     });
//     const total = filtered.reduce((sum, e) => sum + Number(e.amount), 0);
//     setMonthlyExpense(total);
//   }, [selectedMonth, selectedYear, expenses]);

//   // GET UNIQUE MONTHS & YEARS
//   const uniqueYears = [...new Set(expenses.map(e => new Date(e.date).getFullYear()))];
//   const months = [
//     { value: 1, name: "January" }, { value: 2, name: "February" }, { value: 3, name: "March" },
//     { value: 4, name: "April" }, { value: 5, name: "May" }, { value: 6, name: "June" },
//     { value: 7, name: "July" }, { value: 8, name: "August" }, { value: 9, name: "September" },
//     { value: 10, name: "October" }, { value: 11, name: "November" }, { value: 12, name: "December" },
//   ];

//   const barData = expenses.reduce((acc, curr) => {
//     const found = acc.find((item) => item.category === curr.category);
//     if (found) {
//       found.amount += Number(curr.amount);
//     } else {
//       acc.push({ category: curr.category, amount: Number(curr.amount) });
//     }
//     return acc;
//   }, []);

//   const pieData = [
//     { name: "Income", value: summary.income },
//     { name: "Expense", value: summary.expense },
//   ];

//   const lineData = expenses.map((e) => ({
//     date: e.date,
//     amount: Number(e.amount),
//   }));

//   return (
//     <div className="visuals-page">
//       <h2>Expense Visuals & Summary</h2>

//       {/* FILTER SECTION */}
//       <div className="filter-row">
//         <label>📅 Filter by Month & Year:</label>
//         <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
//           <option value="">Select Month</option>
//           {months.map((m) => (
//             <option key={m.value} value={m.value}>{m.name}</option>
//           ))}
//         </select>

//         <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
//           <option value="">Select Year</option>
//           {uniqueYears.map((y, i) => (
//             <option key={i} value={y}>{y}</option>
//           ))}
//         </select>
//       </div>

//       {/* Monthly Expense Display */}
//       {selectedMonth && selectedYear && (
//         <div className="monthly-summary">
//           💸 Total Expense in {months.find(m => m.value === Number(selectedMonth))?.name} {selectedYear}: ₹{monthlyExpense}
//         </div>
//       )}

//       {/* Summary Panel */}
//       <div className="summary-panel">
//         <div className="summary-card income">💰 Income: ₹{summary.income}</div>
//         <div className="summary-card expense">💸 Expense: ₹{summary.expense}</div>
//         <div className="summary-card net">🧮 Net Savings: ₹{summary.net}</div>
//         <div className="summary-card category">📊 Top Category: {summary.mostCategory}</div>
//         <div className="summary-card avg">📅 Avg/Day: ₹{summary.avgPerDay.toFixed(2)}</div>
//       </div>

//       <div className="charts">
//         <div className="chart-box">
//           <h3>Bar Chart by Category</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={barData}>
//               <XAxis dataKey="category" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="amount" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-box">
//           <h3>Pie Chart (Income vs Expense)</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-box">
//           <h3>Line Chart Over Time</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={lineData}>
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Visuals;




import React, { useEffect, useState } from "react";
import { useExpenseContext } from "../src/context/ExpenseContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Visuals.css";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Visuals = () => {
  const { expenses } = useExpenseContext();
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    net: 0,
    mostCategory: "",
    avgPerDay: 0,
  });

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [monthlyData, setMonthlyData] = useState({
    income: 0,
    expense: 0,
    net: 0,
  });

  useEffect(() => {
    if (!expenses.length) return;

    const income = expenses
      .filter((e) => e.type === "income")
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const expense = expenses
      .filter((e) => e.type === "expense")
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const net = income - expense;

    const categoryMap = {};
    expenses.forEach((e) => {
      if (e.type === "expense") {
        categoryMap[e.category] = (categoryMap[e.category] || 0) + Number(e.amount);
      }
    });

    const mostCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    const uniqueDates = new Set(expenses.map((e) => e.date));
    const avgPerDay = (income + expense) / uniqueDates.size;

    setSummary({ income, expense, net, mostCategory, avgPerDay });
  }, [expenses]);

  useEffect(() => {
    const filtered = expenses.filter((e) => {
      const date = new Date(e.date);
      return (
        date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
      );
    });

    const income = filtered
      .filter((e) => e.type === "income")
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const expense = filtered
      .filter((e) => e.type === "expense")
      .reduce((sum, e) => sum + Number(e.amount), 0);

    setMonthlyData({ income, expense, net: income - expense });
  }, [expenses, selectedMonth, selectedYear]);

  const barData = expenses.reduce((acc, curr) => {
    const found = acc.find((item) => item.category === curr.category);
    if (found) {
      found.amount += Number(curr.amount);
    } else {
      acc.push({ category: curr.category, amount: Number(curr.amount) });
    }
    return acc;
  }, []);

  const pieData = [
    { name: "Income", value: summary.income },
    { name: "Expense", value: summary.expense },
  ];

  const lineData = expenses.map((e) => ({
    date: e.date,
    amount: Number(e.amount),
  }));

  const getYearOptions = () => {
    const years = expenses.map((e) => new Date(e.date).getFullYear());
    return Array.from(new Set(years)).sort((a, b) => b - a);
  };

  return (
    <div className="visuals-page">
      <h2>Expense Visuals & Summary</h2>

      {/* Summary Panel */}
      <div className="summary-panel">
        <div className="summary-card income">💰 Income: ₹{summary.income}</div>
        <div className="summary-card expense">💸 Expense: ₹{summary.expense}</div>
        <div className="summary-card net">🧮 Net Savings: ₹{summary.net}</div>
        <div className="summary-card category">📊 Top Category: {summary.mostCategory}</div>
        <div className="summary-card avg">📅 Avg/Day: ₹{summary.avgPerDay.toFixed(2)}</div>
      </div>

      {/* Monthly Filter */}
      <div className="month-filter">
        <label>
          Month:
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {MONTHS.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
        </label>

        <label>
          Year:
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {getYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <div className="monthly-summary">
          <div className="summary-card income">📈 Monthly Income: ₹{monthlyData.income}</div>
          <div className="summary-card expense">📉 Monthly Expense: ₹{monthlyData.expense}</div>
          <div className="summary-card net">💼 Monthly Savings: ₹{monthlyData.net}</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts">
        <div className="chart-box">
          <h3>Bar Chart by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Pie Chart (Income vs Expense)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Line Chart Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Visuals;

