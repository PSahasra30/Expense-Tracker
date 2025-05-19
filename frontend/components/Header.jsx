


// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";

// function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
//   const location = useLocation();

//   useEffect(() => {
//     // Check login status when the component mounts and on storage change
//     const checkLoginStatus = () => {
//       setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
//     };

//     window.addEventListener("storage", checkLoginStatus); // Listen for login/logout updates
//     checkLoginStatus(); // Check on initial load

//     return () => {
//       window.removeEventListener("storage", checkLoginStatus); // Cleanup listener
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     window.dispatchEvent(new Event("storage")); // Trigger navbar update
//   };















import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    // Listen for login/logout events
    window.addEventListener("storage", checkLoginStatus);

    // Initial check
    checkLoginStatus();

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token"); // ✅ Clear token too
    setIsLoggedIn(false);
    alert("Logged out successfully ✅");
    window.dispatchEvent(new Event("storage")); // notify other tabs/components
    navigate("/"); // ✅ Redirect to home page
  };



  return (
    <header className="header">
      <h1>Expense Tracker</h1>
      <nav>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link>
            <Link to="/signup" className={location.pathname === "/signup" ? "active" : ""}>Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
