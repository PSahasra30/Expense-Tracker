// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();  // Hook for navigation

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/login", {
//         email,
//         password,
//       });

//       console.log(res.data); // Log the full response for debugging

//       // Check if the response has a success message or another indicator
//       if (res.data.message === "Login successful") {
//         localStorage.setItem("isLoggedIn", "true");
//         window.dispatchEvent(new Event("storage")); // Trigger navbar update
//         navigate("/dashboard");  // Redirect to dashboard on successful login
//       } else {
//         alert("Login failed: " + res.data.message);  // Show message from backend
//       }
//     } catch (error) {
//       console.error("Login error", error);
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin} className="auth-form">
//         <input
//           type="email"
//           placeholder="Email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           name="email"
//           autoComplete="username"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           name="password"
//           autoComplete="current-password"
//         />
//         <button type="submit">Log In</button>
//       </form>
//     </div>
//   );
// }

// export default Login;





// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();  // Hook for navigation

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/login", {
//         email,
//         password,
//       });

//       if (res.data.message === "Login successful") {
//         localStorage.setItem("isLoggedIn", "true");
//         window.dispatchEvent(new Event("storage"));  // Trigger navbar update
//         navigate("/dashboard");  // Redirect to dashboard on successful login
//       } else {
//         alert("Login failed: " + res.data.message);  // Show message from backend
//       }
//     } catch (error) {
//       console.error("Login error", error);
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin} className="auth-form">
//         <input
//           type="email"
//           placeholder="Email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           name="email"
//           autoComplete="username"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           name="password"
//           autoComplete="current-password"
//         />
//         <button type="submit">Log In</button>
//       </form>
//     </div>
//   );
// }

// export default Login;



















import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (res.data.message === "Login successful" && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isLoggedIn", "true");

        alert("Login successful ✅");
        window.dispatchEvent(new Event("storage"));
        navigate("/dashboard");
      } else {
        alert("Login failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Login error", error);
      alert("Login failed ❌");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          autoComplete="current-password"
        />
        <button type="submit">Log In</button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Don't have an account?{" "}
        <Link
            to="/signup"
            style={{
              color: "#0d6efd",
              fontWeight: "bold",
              textDecoration: "none",
        }}
        >
          Sign up
        </Link>
    </p>


    </div>
  );
}

export default Login;
