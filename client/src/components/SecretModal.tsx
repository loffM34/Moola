import "../styles/secretModalStyles.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import SnakeGame from "../scripts/gameGrid";
function SecretModal({ closeModal }) {
  return (
    <>
      <div className="secretModalBackground">
        <div className="secretModalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => closeModal(false)}> X </button>
          </div>
          <body className="gameModalBody">
            <div id="score">
              Score: <span id="scoreValue">1</span>
            </div>
              <SnakeGame />
        
          </body>
        </div>
      </div>
    </>
  );
}

export default SecretModal;
