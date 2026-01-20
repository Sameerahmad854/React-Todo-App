import React from "react";

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header>
      <h1>MY To-Do-App</h1>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}
