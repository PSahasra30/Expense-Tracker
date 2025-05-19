// import React from "react";
// import "./App.css";

// function App() {
//   return (
//     <div className="app-container">
//       {/* Header */}
//       <header className="header">
//         <h1>Expense Tracker</h1>
//         <nav className="nav-links">
//           <a href="#">Home</a>
//           <a href="#">Login</a>
//           <a href="#">Signup</a>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main className="main-content">
//         <h2>Track Your Expenses Smartly</h2>
//         <p className="subtitle">
//           Take control of your finances with our intuitive, easy-to-use platform.
//         </p>

//         <div className="features">
//           <div className="card">
//             <h3>Secure Login</h3>
//             <p>Sign up and log in securely using JWT-based authentication.</p>
//           </div>
//           <div className="card">
//             <h3>Smart Dashboard</h3>
//             <p>View, filter, and analyze your expenses with powerful charts and tools.</p>
//           </div>
//           <div className="card">
//             <h3>Real-time Tracking</h3>
//             <p>Add and update transactions instantly from any device.</p>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="footer">
//         <p>&copy; 2025 Expense Tracker. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;



import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";
// import "./index.css";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../components/Dashboard"; // Dashboard after login
import EditExpense from "../pages/EditExpense";
import Transactions from "../components/Transactions";
import Settings from "../components/SettingsPage";
import Navbar from "../components/Navbar";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} /> 
            <Route path="/edit/:id" element={<EditExpense />} />
            <Route path="/settings" element={<Settings />} />

          </Routes>
        </main>
        <Footer />
        {/* Toast container to show toast notifications anywhere */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;


