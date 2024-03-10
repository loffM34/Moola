import "../styles/newBotModal.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { createNewBot } from "../scripts/createBot";
import { useLocation } from "react-router-dom";
import { getAuthContext } from "../scripts/authContext";
import StockSearchForm from "./stockSearchForm";

function NewBotModal({ closeModal }) {
  const userEmail = getAuthContext().email;
  const [botName, setBotName] = useState("");
  const [alpacaKey, setAlpacaKey] = useState("");
  const [alpacaSecret, setAlpacaSecret] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");
  const [tradingStrategy, setTradingStrategy] = useState("");
  const [startingAmount, setStartingAmount] = useState("");
  const [cashRiskPercentage, setCashRiskPercentage] = useState("");
  const [tradeProfitOrder, setTradeProfitOrder] = useState("");
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => closeModal(false)}> X </button>
          </div>
          <div className="title">
            <h1> Create New Bot</h1>
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
              <div className="stock-input">
                <label>Stock:</label>
                <select
                  className="form-control"
                  value={stockSymbol}
                  onChange={(e) => setStockSymbol(e.target.value)}
                >
                  <option hidden>
                    Choose A Stock <i className="bi bi-list"></i>
                  </option>
                  <option value="SPY">SPY</option>
                  <option value="APPL">APPL</option>
                  <option value="TSLA">TSLA</option>
                </select>
              </div>
              <StockSearchForm />
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
                onClick={() => {
                  if (
                    !botName ||
                    !alpacaKey ||
                    !alpacaSecret ||
                    !stockSymbol ||
                    !tradingStrategy ||
                    !startingAmount ||
                    !cashRiskPercentage ||
                    !tradeProfitOrder
                  ) {
                    alert("Please fill in all the fields");
                  } else {
                    createNewBot(
                      userEmail,
                      botName,
                      alpacaKey,
                      alpacaSecret,
                      stockSymbol,
                      tradingStrategy,
                      startingAmount,
                      cashRiskPercentage,
                      tradeProfitOrder
                    );
                    closeModal(false);
                    window.location.reload();
                  }
                }}
              >
                Create New Bot
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewBotModal;
