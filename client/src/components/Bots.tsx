import "../styles/botStyles.css";
import { useState } from "react";
import { deleteBot } from "../scripts/botScripts";
import { findBot } from "../scripts/botScripts";
import EditBotModal from "./EditBotModal";
import { getAuthContext } from "../scripts/authContext";

const user = getAuthContext();

function Bots({ botName, stockSymbol }) {
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

  return (
    <>
      <div className="bots">
        <div className="stockSymbol">
          <p>{stockSymbol}</p>
        </div>
        <div className="botName">
          <p>{botName}</p>
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
