import "../styles/botStyles.css";
import { useState } from "react";
import { deleteBot } from "../scripts/botScripts";
import { findBot } from "../scripts/botScripts";
import EditBotModal from "./EditBotModal";
import { getAuthContext } from "../scripts/authContext";

const user = getAuthContext();

function Bots({
  botName,
  stockSymbol,
  transactionHistory,
  darkMode,
  stockPrice,
  stockDollarChange,
  stockPercentChange,
}) {
  const [openEditBotModal, setOpenModal] = useState(false);
  const [botData, setBotData] = useState(null);

  async function handleOpenModal() {
    try {
      var botData = await findBot(user.email, botName);
      setBotData(botData);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetchign BOt data: ", error);
    }
  }

  console.log("trans hist", transactionHistory)
  const botTransactions = transactionHistory;

  return (
    <>
      <div
        className={`bots ${darkMode ? " dark-mode" : ""}${
          openEditBotModal ? " modalOpen" : ""
        }`}
      >
        <div className="botName">
          <p>{botName}:</p>
        </div>
        <div className="botContentContainer">
          <div className="stockLink">
            <a
              href={"https://finance.yahoo.com/quote/" + stockSymbol}
              target="_blank"
            >
              <div className="stockSymbol">
                <p>{stockSymbol}</p>
                <span className="tooltiptext">More Info?</span>
              </div>
            </a>
          </div>

          <div
            className={`stockData ${
              stockPrice != "Loading..." ? "" : "errLoading"
            }`}
          >
            <p className="stockPrice"> {stockPrice}</p>
            <div
              className={`stockDataContainer ${
                stockDollarChange > 0 ? "positive" : "negative"
              }`}
            >
              <p className="stockDollarChange"> {stockDollarChange} </p>
              <p className="stockPercentChange">{stockPercentChange}</p>
            </div>
            <div className="transactionList">
              <h3>Transaction History</h3>
              {transactionHistory != null  &&(
                <ul>
                {botTransactions.slice(botTransactions.length-5,botTransactions.length).map((transaction,index)=>(
                  <li key={index}>[{transaction}]</li>
                ))}
              </ul>
              )}

              {(transactionHistory == null || transactionHistory.length == 0) &&(
                <ul className="nullTransactions">N/A</ul>
              )}
              
            </div>
          </div>
        </div>
        <div className="botButtons">
          <button
            onClick={() => {
              deleteBot(user.email, botName);
              window.location.reload();
            }}
            className="deleteBotBtn"
          >
            <i className="bi bi-trash3"> </i>
          </button>

          <button
            className="openEditBotModal"
            onClick={() => {
              handleOpenModal();
            }}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          {openEditBotModal && (
            <EditBotModal closeModal={setOpenModal} botData={botData} />
          )}
        </div>
      </div>
    </>
  );
}

export default Bots;
