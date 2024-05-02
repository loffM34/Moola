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

  const maxNumBots = userBots.length >= 5;

  console.log("user lenght", userBots.length, userBots.length >= 5);

  const currentTime = new Date();
  const startTime = new Date();
  startTime.setHours(9, 35, 0);
  const endTime = new Date();
  endTime.setHours(15, 30, 0);

  const stockMarketOpen =
    currentTime.getTime() > startTime.getTime() &&
    currentTime.getTime() < endTime.getTime();

  return (
    <section className={`home-section ${darkMode ? "dark-dashboard" : ""}`}>
      <div className="dashHeader">
        <h1 className="greeting"> Welcome, {user.firstName} </h1>
      </div>
      <div className="body">
        {openNewBotModal && <NewBotModal closeModal={setOpenModal} />}
        {/* dynamically display userBots array */}
        {userBots.length > 0 &&
          userBots.map((bot) => (
            <Bots
              key={bot.botName}
              botName={bot.botName}
              stockSymbol={bot.stockSymbol}
              transactionHistory={null}
              darkMode={darkMode}
              stockPrice={""}
              stockDollarChange={""}
              stockPercentChange={""}
            />
          ))}
        <div className="newBotContainer">
          {maxNumBots ? (
            <div>
              <div className="maxNumBots">Maximum Number of Bots</div>{" "}
              <div className="newBotClosedImage"></div>
            </div>
          ) : (
            <div>
              {!stockMarketOpen ? (
                <button
                  className="newBotButton"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  <div className="openNewBotModal"></div>
                </button>
              ) : (
                <div>
                  <p className="marketClosedMessage">
                    {" "}
                    Stock Market is Currently Closed.{" "}
                  </p>
                  <div className="newBotClosedImage"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
