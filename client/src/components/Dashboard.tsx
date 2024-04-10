import { useEffect, useState } from "react";
import React from "react";
import Bots from "./Bots";
import "bootstrap-icons/font/bootstrap-icons.css";
import NewBotModal from "./NewBotModal";
import "../styles/DashboardStyles.css";
import { getAuthContext } from "../scripts/authContext";
import { getUserBots } from "../scripts/getUserBots";

function Dashboard({ darkMode }) {
  const user = getAuthContext();

  console.log("Display Toggle", darkMode);

  const [openNewBotModal, setOpenModal] = useState(false);

  const [userBots, setUserBots] = useState([]);

  useEffect(() => {
    async function fetchUserBots() {
      try {
        const response = await getUserBots(user.email);
        const botArray = response.botArray;
        setUserBots(botArray);
      } catch (error) {
        console.error("Error fetching user bots:", error);
      }
    }

    fetchUserBots();
  }, [setOpenModal]);

  console.log("UserBots", userBots);

  return (
    <section className={`home-section ${darkMode ? "dark-dashboard" : ""}`}>
      <div className="dashHeader">
        <h1 className="greeting"> Welcome, {user.firstName} </h1>
      </div>
      <div className="body">
        <button
          className="openNewBotModal"
          onClick={() => {
            setOpenModal(true);
          }}
        ></button>
        {openNewBotModal && <NewBotModal closeModal={setOpenModal} />}

        {/* dynamically display userBots array */}
        {userBots.length > 0 &&
          userBots.map((bot) => (
            <Bots
              key={bot.botName}
              botName={bot.botName}
              stockSymbol={bot.stockSymbol}
              darkMode ={darkMode}
            />
          ))}
      </div>
    </section>
  );
}

export default Dashboard;
