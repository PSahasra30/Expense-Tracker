// components/Settings.jsx
import React, { useEffect, useState } from "react";
import "./SettingsPage.css"; // Optional: style separately if you want

const Settings = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <div className="toggle-group">
        <label htmlFor="darkToggle">🌙 Enable Dark Mode</label>
        <input
          type="checkbox"
          id="darkToggle"
          checked={isDark}
          onChange={() => setIsDark(!isDark)}
        />
      </div>
    </div>
  );
};

export default Settings;
