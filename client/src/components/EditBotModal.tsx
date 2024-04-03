import "../styles/editBotModal.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { updateBot, findBot } from "../scripts/botScripts";
import { useLocation } from "react-router-dom";
import { getAuthContext } from "../scripts/authContext";

function EditBotModal({ closeModal, botData }) {
  const userEmail = getAuthContext().email;
  const currentBotInfo = botData;
  const [botName, setBotName] = useState(botData.botName);
  const [alpacaEndpoint, setAlpacaEndpoint] = useState(botData.alpacaEndpoint);
  const [alpacaKey, setAlpacaKey] = useState(botData.alpacaKey);
  const [alpacaSecret, setAlpacaSecret] = useState(botData.alpacaSecret);
  const [tradingStrategy, setTradingStrategy] = useState(botData.tradingStrat);
  const [startingAmount, setStartingAmount] = useState(botData.startCash);
  const [cashRiskPercentage, setCashRiskPercentage] = useState(
    botData.riskPercent
  );
  const [tradeProfitOrder, setTradeProfitOrder] = useState(
    botData.tradeProfitOrder
  );

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => closeModal(false)}> X </button>
          </div>
          <div className="title">
            <h1> Edit {currentBotInfo.botName}</h1>
          </div>
          <div className="body">
            <div className="bot-name-input">
              <input
                type="text"
                required
                className="form-control"
                placeholder="Bot Name"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
              />
            </div>
            <div className="alpaca-info-input">
              <h3>Alpaca Info</h3>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Endpoint"
                value={alpacaEndpoint}
                onChange={(e) => setAlpacaEndpoint(e.target.value)}
              />
              <input
                type="text"
                required
                className="form-control"
                placeholder="Alpaca Key"
                value={alpacaKey}
                onChange={(e) => setAlpacaKey(e.target.value)}
              />
              <input
                type="text"
                required
                className="form-control"
                placeholder="Alpaca Secret"
                value={alpacaSecret}
                onChange={(e) => setAlpacaSecret(e.target.value)}
              />
            </div>
            <div className="stockInformation">
              <h3>Trading Info</h3>
              <div className="trading-strategy-input">
                <label>Strategy:</label>
                <select
                  className="form-control"
                  value={tradingStrategy}
                  onChange={(e) => setTradingStrategy(e.target.value)}
                >
                  <option hidden>
                    Trading Strategy <i className="bi bi-list"></i>
                  </option>
                  <option value="dayTrader">Day Trader</option>
                  <option value="intermediateTrader">
                    Intermediate Trader
                  </option>
                  <option value="longTermTrader">Long Term Trader</option>
                </select>
              </div>
              <div className="starting-cash-input">
                <label>Starting Amount:</label>
                <input
                  type="number"
                  required
                  className="form-control"
                  placeholder="Starting Amount"
                  min="5"
                  max="1000000"
                  value={startingAmount}
                  onChange={(e) => setStartingAmount(e.target.value)}
                />
              </div>
              <div className="starting-cash-input">
                <label>Cash Risk Percentage:</label>
                <input
                  type="number"
                  required
                  className="form-control"
                  placeholder="Cash Risk Percentage"
                  min="1"
                  max="100"
                  value={cashRiskPercentage}
                  onChange={(e) => setCashRiskPercentage(e.target.value)}
                />
              </div>
              <div className="trade-profit-order-input">
                <label>Trade Profit Order:</label>
                <input
                  type="number"
                  required
                  className="form-control"
                  placeholder="Trade Profit Order"
                  value={tradeProfitOrder}
                  onChange={(e) => setTradeProfitOrder(e.target.value)}
                />
              </div>
            </div>
            <div className="footer">
              <button
                onClick={async () => {
                  if (
                    !botName ||
                    !alpacaEndpoint ||
                    !alpacaKey ||
                    !alpacaSecret ||
                    !tradingStrategy ||
                    !startingAmount ||
                    !cashRiskPercentage ||
                    !tradeProfitOrder
                  ) {
                    alert("Please fill in all the fields");
                  } else {
                    const response = await updateBot(
                      userEmail,
                      currentBotInfo.botName,
                      botName.trim(),
                      alpacaEndpoint,
                      alpacaKey,
                      alpacaSecret,
                      currentBotInfo.stockSymbol,
                      tradingStrategy,
                      currentBotInfo.startCash,
                      cashRiskPercentage,
                      tradeProfitOrder
                    );
                    if (response.status === "name taken") {
                      alert("Bot name already taken for this user");
                      return;
                    } else {
                      closeModal(false);
                      window.location.reload();
                    }
                  }
                }}
              >
                Update Bot
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBotModal;
