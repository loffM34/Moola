import { useEffect, useState } from "react";
import React from "react";
import Bots from "./Bots";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/botAnalyticsStyles.css";
import { getAuthContext } from "../scripts/authContext";
import { getUserBots } from "../scripts/getUserBots";
import { getStockData } from "../scripts/getStockData";

function BotAnalytics({ darkMode }) {
  const user = getAuthContext();
  const [userBots, setUserBots] = useState([]);
  const [stockData, setStockData] = useState({
    stockPrice: "Loading...",
    stockDollarChange: "---",
    stockPercentChange: "(%---)",
  });

  useEffect(() => {
    async function fetchUserBots() {
      try {
        const response = await getUserBots(user.email);
        const botArray = response.botArray;
        botArray.forEach((obj) => {
          obj.stockPrice = "Loading...";
          obj.stockDollarChange = "---";
          obj.stockPercentChange = "(%---)";
        });
        console.log(botArray);
        setUserBots(botArray);
      } catch (error) {
        console.error("Error fetching user bots:", error);
      }
    }

    fetchUserBots();
  }, []);
  return (
    <section className={`home-section ${darkMode ? "dark-dashboard" : ""}`}>
      <div className="dashHeader">
        <h1>Bot Analytics</h1>
        <button
          onClick={async () => {
            try {
              const response = await getStockData(userBots);
              var updatedUserBots = userBots;
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
               
              setUserBots(updatedUserBots);

              // console.log("RESPONSE", response)
              // var data = {
              //   stockPrice: userBots[0].stockPrice,
              //   stockDollarChange: "bobby",
              //   stockPercentChange: "response.stockPercentChange"
              // }
              // setStockData(data);
            } catch (error) {
              console.error("error fetching stock data", error);
            }
          }}
        >
          CLICK HERE
        </button>
      </div>
      <div className="body">
        <div className="botAnalytics-bots">
          {/* dynamically display userBots array */}
          {userBots.length > 0 &&
            userBots.map((bot) => (
              <Bots
                key={bot.botName}
                botName={bot.botName}
                stockSymbol={bot.stockSymbol}
                darkMode={darkMode}
                stockPrice={bot.stockPrice}
                stockDollarChange={stockData.stockDollarChange}
                stockPercentChange={stockData.stockPercentChange}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default BotAnalytics;
