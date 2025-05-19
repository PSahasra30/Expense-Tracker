import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/signup", {
        fullName,
        email,
        password,
      });

      // ✅ Use HTTP status instead of res.data.success
      if (res.status === 201) {
        alert("Signup successful");
        navigate("/login");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Signup error", error);
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="text"
          placeholder="Full Name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          name="fullName"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          autoComplete="new-password"
        />
        <button type="submit">Sign Up</button>
      </form>

      <p style={{ marginTop: "1rem" }}>
              Already have an account? <Link to="/login" style={{ color: "#0d6efd", fontWeight: "bold", textDecoration: "none" }}>Log in</Link>
      </p>
    </div>
  );
}

export default Signup;
