import Sidebar from "../components/Sidebar";
import BotAnalytics from "../components/BotAnayltics";
import { useEffect, useState } from "react";
function Analytics() {
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
      <div className={`botAnalytics ${darkMode ? "dark-mode" : ""}`}>
        <Sidebar darkMode={darkMode} toggleDarkMode={handleToggleDarkMode} />
        <BotAnalytics  darkMode={darkMode}/>
      </div>
    </>
  );
}

export default Analytics;
