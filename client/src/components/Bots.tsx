function Bots({ botName, stockSymbol }) {
  return (
    <>
      <div className="bots">
        <p>Bot Name: {botName}</p>
        <p>Stock: {stockSymbol}</p>
      </div>
    </>
  );
}

export default Bots;
