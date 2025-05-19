// src/pages/Dashboard.jsx
import React, { useState } from "react";
import Transactions from "./Transactions";
import AddExpense from "./AddExpense";
import Visuals from "./Visuals";
import Settings from "./SettingsPage";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("transactions");

  const renderPage = () => {
    switch (activeTab) {
      case "transactions":
        return <Transactions />;
      case "add":
        return <AddExpense />;
      case "visuals":
        return <Visuals />;
      case "settings":
        return <Settings />;
      default:
        return <Transactions />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* <h1 className="dashboard-heading">Expense Tracker</h1>
      <p className="dashboard-subtitle">Track and manage your expenses easily</p> */}

      <nav className="dashboard-nav">
        <button
          className={activeTab === "transactions" ? "nav-button active" : "nav-button"}
          onClick={() => setActiveTab("transactions")}
        >
          Transactions
        </button>
        <button
          className={activeTab === "add" ? "nav-button active" : "nav-button"}
          onClick={() => setActiveTab("add")}
        >
          Add Expense
        </button>
        <button
          className={activeTab === "visuals" ? "nav-button active" : "nav-button"}
          onClick={() => setActiveTab("visuals")}
        >
          Visuals
        </button>
        {/* <button
          className={activeTab === "settings" ? "nav-button active" : "nav-button"}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button> */}
      </nav>

      <div className="dashboard-content">{renderPage()}</div>
    </div>
  );
};

export default Dashboard;
