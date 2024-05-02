import "../styles/editBotModal.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { updateBot } from "../scripts/botScripts";
import { getAuthContext } from "../scripts/authContext";

function EditBotModal({ closeModal, botData }) {
  const userEmail = getAuthContext().email;
  const currentBotInfo = botData;
  const [botName, setBotName] = useState(botData.botName);
  const [alpacaEndpoint, setAlpacaEndpoint] = useState(botData.alpacaEndpoint);
  const [alpacaKey, setAlpacaKey] = useState(botData.alpacaKey);
  const [alpacaSecret, setAlpacaSecret] = useState(botData.alpacaSecret);
  const [tradingStrategy, setTradingStrategy] = useState(botData.tradingStrat);
  const [cashRiskPercentage, setCashRiskPercentage] = useState(
    parseFloat(botData.riskPercent) * 100
  );
  const [tradeProfitOrder, setTradeProfitOrder] = useState(
    botData.tradeProfitOrder
  );

  var validRisk = cashRiskPercentage > 0 && cashRiskPercentage <= 100;
  var validProfitOrder = parseFloat(tradeProfitOrder) > 0;

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
              {/* <div className="starting-cash-input">
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
              </div> */}
              <div className="risk-percent-input">
                <label>
                  Cash Risk Percentage{" "}
                  <i className="bi bi-info-circle-fill"></i>
                  <span className="infoTooltip">
                    Cash Risk Percentage is the percent of your cash your bot is
                    able to trade with each transaction
                  </span>
                </label>
                <input
                  type="number"
                  required
                  className="form-control"
                  placeholder="Cash Risk Percentage"
                  min="1"
                  max="100"
                  style={{
                    borderColor:
                      (cashRiskPercentage > 0 && cashRiskPercentage <= 100) ||
                      String(cashRiskPercentage).length == 0
                        ? "grey"
                        : "red",
                    borderWidth:
                      (cashRiskPercentage > 0 && cashRiskPercentage <= 100) ||
                      String(cashRiskPercentage).length == 0
                        ? "1px"
                        : "2px",
                  }}
                  value={cashRiskPercentage}
                  onChange={(e) =>
                    setCashRiskPercentage(parseFloat(e.target.value))
                  }
                />
              </div>
              <div className="trade-profit-order-input">
                <label>
                  Trade Profit Order <i className="bi bi-info-circle-fill"></i>
                  <span className="infoTooltip">
                    Trade Profit Order is the buy out cash value where your bot
                    will sell all assets once reaching
                  </span>
                </label>
                <input
                  type="number"
                  required
                  className="form-control"
                  placeholder="Trade Profit Order"
                  style={{
                    borderColor:
                      parseFloat(tradeProfitOrder) > 0 ||
                      tradeProfitOrder.length == 0
                        ? "grey"
                        : "red",
                    borderWidth:
                      parseFloat(tradeProfitOrder) > 0 ||
                      tradeProfitOrder.length == 0
                        ? "1px"
                        : "2px",
                  }}
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
                    !cashRiskPercentage ||
                    !tradeProfitOrder
                  ) {
                    alert("Please fill in all the fields");
                  } else {
                    if (!validRisk || !validProfitOrder) {
                      alert("Invalid Data entered. Try again.");
                    }
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
                      cashRiskPercentage * 0.01,
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
