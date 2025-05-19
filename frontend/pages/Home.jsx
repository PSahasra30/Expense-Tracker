import React from "react";
import { Link } from "react-router-dom"; // For navigation to Login/Signup
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* <header>
        <h1>Expense Tracker</h1>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </header> */}

      <main className="main-content">
        <h2>Track Your Expenses Smartly</h2>
        <p className="subtitle">
          Stay financially healthy with our intuitive, easy-to-use platform.
        </p>

        {/* Key Features Section */}
        <div className="features">
          <div className="card">
            <h3>Secure Login</h3>
            <p>Sign up and log in securely using JWT-based authentication.</p>
          </div>
          <div className="card">
            <h3>Smart Dashboard</h3>
            <p>View, filter, and analyze your expenses with powerful charts and tools.</p>
          </div>
          <div className="card">
            <h3>Real-time Tracking</h3>
            <p>Add and update transactions instantly from any device.</p>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="cta-buttons">
          <Link to="/login" className="cta-button">Login</Link>
          <Link to="/signup" className="cta-button">Signup</Link>
        </div> */}
      </main>

      <footer className="footer">
        <p>&copy; 2025 Expense Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
