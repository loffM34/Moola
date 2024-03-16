import "../styles/newBotModal.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { createNewBot } from "../scripts/botScripts";
import { useLocation } from "react-router-dom";
import { getAuthContext } from "../scripts/authContext";
import StockSearchForm from "./stockSearchForm";

function NewBotModal({ closeModal }) {
  const userEmail = getAuthContext().email;
  const [botName, setBotName] = useState("");
  const [alpacaKey, setAlpacaKey] = useState("");
  const [alpacaSecret, setAlpacaSecret] = useState("");
  const [tradingStrategy, setTradingStrategy] = useState("");
  const [startingAmount, setStartingAmount] = useState("");
  const [cashRiskPercentage, setCashRiskPercentage] = useState("");
  const [tradeProfitOrder, setTradeProfitOrder] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [stockSymbol, setStockSymbol] = useState("");

  async function handleStockSearch(query) {
    try {
      const response = await fetch(
        "http://localhost:9000/GetStocks?query=" + query
      );
      if (!response.ok) {
        console.error("Failed to search Stocks");
        setSearchResults([]);
        return;
      }
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("error searching stocks: ", error);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    const query = e.target.elements.searchQuery.value;
    if (query) {
      handleStockSearch(query);
    }
  }

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
              </div>
              {/* <StockSearchForm /> */}
              <form className="d-flex" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="form-control me-2"
                  name="searchQuery"
                  placeholder="Enter stock symbol"
                />
                <button
                  className="btn btn-outline-success"
                  id="searchButton"
                  type="submit"
                >
                  Search
                </button>
              </form>

              <select
                className="form-select"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
              >
                <option hidden>Select a stock</option>
                {searchResults.map((result, index) => (
                  <option
                    className="drop-item"
                    key={index}
                    value={result.ticker}
                  >
                    {result.ticker}
                  </option>
                ))}
              </select>
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
                    const response = await createNewBot(
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

                    console.log("response", response.status);
                    if (response.status === "name taken") {
                      alert("Bot name already taken for this user");
                      return;
                    } else {
                      console.log("made  it here");
                      closeModal(false);
                      window.location.reload();
                    }
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
