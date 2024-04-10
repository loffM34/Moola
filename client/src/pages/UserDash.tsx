import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import { useState } from "react";
import "../styles/userDashStyles.css"

function UserDash() {

  const[darkMode,setDarkMode] = useState(false);

  return (
    <>
    <div className={`userDash ${darkMode ? "dark-mode" : ""}`}>
      <Sidebar darkMode ={darkMode} toggleDarkMode={() => setDarkMode(prevMode => !prevMode)}/>
      <Dashboard darkMode ={darkMode}/>
      </div>
    </>
  );
}

export default UserDash;
