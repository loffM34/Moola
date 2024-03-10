export const createNewBot = async (
  //userEmail to find user to add bots to
  userEmail,
  bot_name,
  alpaca_key,
  alpaca_secret,
  stock_symbol,
  trading_strat,
  start_cash,
  risk_percentage,
  trade_profit_order
) => {
  try {
    //send Create bot parameters to back end to run the create new bot function
    fetch("http://localhost:9000/CreateBotApi", {
      method: "POST",
      body: JSON.stringify({
        user_email:userEmail,
        bot_name: bot_name,
        alpaca_key: alpaca_key,
        alpaca_secret: alpaca_secret,
        trading_strat: trading_strat,
        stock_symbol: stock_symbol,
        start_cash: start_cash,
        risk_percentage: risk_percentage,
        trade_profit_order: trade_profit_order,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("ERROR create new bot: ", error);
  }
};
