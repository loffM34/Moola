import "../styles/Sidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthContext, clearAuthContext } from "../scripts/authContext";
import SecretModal from "./SecretModal";

interface SidebarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

function Sidebar({ darkMode, toggleDarkMode }: SidebarProps) {
  const history = useNavigate();
  const user = getAuthContext();

  const [openSecretModal, setOpenSecretModal] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [darkMode, setDarkMode] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen((prevState) => !prevState);
  }

  function handleLogout() {
    clearAuthContext();
    localStorage.removeItem("token");
    history("/Home");
  }

  return (
    <>
      <div
        className={`sidebar ${isSidebarOpen ? "open" : ""}${
          darkMode ? "dark-mode" : ""
        }`}
      >
        <div className="logo_details">
          <div className="logo_name">Website name</div>
          <i className="bi bi-list" id="btn" onClick={toggleSidebar}></i>
        </div>
        <ul className="nav-list">
          <li>
            <a href="/UserDash">
              <i className="bi bi-grid"></i>
              <span className="link_name"> Dashboard</span>
            </a>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <a href="/BotAnalytics">
              <i className="bi bi-bar-chart-line"></i>
              <span className="link_name"> Bot Analytics</span>
            </a>
            <span className="tooltip">Bot Analytics</span>
          </li>

          <p className="toggleText">Toggle Display</p>
          <div className="displayToggle">
            <input
              type="checkbox"
              id="darkmode-toggle"
              onChange={toggleDarkMode}
              // checked={darkMode}
            />
            <label id="toggleLabel" htmlFor="darkmode-toggle"></label>
          </div>
          <li className="profile">
            <div className="profile_details">
              <button
                className="secretButton"
                onClick={() => {
                  toggleSidebar();
                  setOpenSecretModal(true);
                }}
              >
                <div className="profilePicture"></div>
              </button>
              {openSecretModal && (
                <SecretModal closeModal={setOpenSecretModal} />
              )}
              <div className="profile_content">
                <div className="name">
                  {user.firstName} {user.lastName}
                </div>
              </div>
            </div>
            <i
              className="bi bi-box-arrow-in-left"
              id="log_out"
              onClick={handleLogout}
            ></i>
          </li>
        </ul>
      </div>

      <script src=""></script>
    </>
  );
}

export default Sidebar;
