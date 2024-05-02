import { useEffect, useState } from "react";
import Bots from "./Bots";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/botAnalyticsStyles.css";
import { getAuthContext } from "../scripts/authContext";
import { getUserBots } from "../scripts/getUserBots";
import { getStockData } from "../scripts/getStockData";

function BotAnalytics({ darkMode }) {
  const user = getAuthContext();
  const [userBots, setUserBots] = useState([]);

  useEffect(() => {
    async function fetchUserBots() {
      try {
        const response = await getUserBots(user.email);
        const botArray = response.botArray;
        botArray.forEach((obj) => {
          obj.stockPrice = "Loading...";
          obj.stockDollarChange = "";
          obj.stockPercentChange = "";
        });
        setUserBots(botArray);
        displayStockData(botArray);
      } catch (error) {
        console.error("Error fetching user bots:", error);
      }
    }

    fetchUserBots();
  }, []);

  async function displayStockData(botArray) {
    try {
      const response = await getStockData(botArray);

      setUserBots((prevBots) => {
        var updatedUserBots = [...prevBots];
        for (var i = 0; i < updatedUserBots.length; i++) {
          for (var j = 0; j < response.length; j++) {
            if (response[j].stockSymbol != null) {
              if (updatedUserBots[i].stockSymbol == response[j].stockSymbol) {
                updatedUserBots[i].stockPrice = response[j].stockPrice;
                updatedUserBots[i].stockDollarChange =
                  response[j].stockDollarChange;
                updatedUserBots[i].stockPercentChange =
                  response[j].stockPercentChange;
              }
            }
          }
        }
        return updatedUserBots;
      });
    } catch (error) {
      console.error("error fetching stock data", error);
    }
  }

  return (
    <section className={`home-section ${darkMode ? "dark-dashboard" : ""}`}>
      <div className="dashHeader">
        <h1>Bot Analytics</h1>
      </div>
      <div className="body">
        <div className="botAnalytics-bots">
          {/* dynamically display userBots array */}
          {userBots.length > 0 &&
            userBots.map(
              (bot) => (
                (
                  <Bots
                    key={bot.botName}
                    botName={bot.botName}
                    stockSymbol={bot.stockSymbol}
                    transactionHistory ={bot.transactionHistory}
                    darkMode={darkMode}
                    stockPrice={bot.stockPrice}
                    stockDollarChange={bot.stockDollarChange}
                    stockPercentChange={bot.stockPercentChange}
                  />
                )
              )
            )}
        </div>
      </div>
    </section>
  );
}

export default BotAnalytics;
