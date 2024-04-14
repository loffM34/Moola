import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import { useState, useEffect } from "react";
import "../styles/pageStyles.css";

function UserDash() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "true";
  });

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === "true");
    }
  }, []);

  function handleToggleDarkMode() {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  }

  return (
    <>
      <div className={`userDash ${darkMode ? "dark-mode" : ""}`}>
        <Sidebar darkMode={darkMode} toggleDarkMode={handleToggleDarkMode} />
        <Dashboard darkMode={darkMode} />
      </div>
    </>
  );
}

export default UserDash;
