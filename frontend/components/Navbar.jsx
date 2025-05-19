
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
//     };

//     // Listen for login/logout from anywhere
//     window.addEventListener("storage", checkLoginStatus);

//     // Check login status when page loads
//     checkLoginStatus();

//     // Cleanup the event listener on unmount
//     return () => {
//       window.removeEventListener("storage", checkLoginStatus);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn"); // Remove isLoggedIn from localStorage
//     setIsLoggedIn(false); // Update the local state
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <nav className="navbar">
//       <Link to="/" className="logo">Expense Tracker</Link>
//       <div className="nav-links">
//         <Link to="/dashboard">Dashboard</Link>
//         {isLoggedIn ? (
//           <button onClick={handleLogout} className="nav-btn">Logout</button>
//         ) : (
//           <Link to="/login" className="nav-btn">Login</Link>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;









import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
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
    <nav className="navbar">
      <Link to="/" className="logo">Expense Tracker</Link>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="nav-btn">Logout</button>
        ) : (
          <Link to="/login" className="nav-btn">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
