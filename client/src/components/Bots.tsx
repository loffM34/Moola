import "../styles/botStyles.css";
import { deleteBot } from "../scripts/botScripts";
import { getAuthContext } from "../scripts/authContext";

const user = getAuthContext();

function Bots({ botName, stockSymbol }) {
  return (
    <>
      <div className="bots">
        <div className="stockSymbol">
          <p>{stockSymbol}</p>
        </div>
        <div className="botName">
          <p>Bot Name: {botName}</p>
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
        </div>
      </div>
    </>
  );
}

export default Bots;

// class name = bots
