export const createNewBot = async (
  //userEmail to find user to add bots to
  user_email,
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
    const response = await fetch("http://localhost:9000/CreateBotApi", {
      method: "POST",
      body: JSON.stringify({
        user_email: user_email,
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

    return response.json();
  } catch (error) {
    console.log("ERROR creating new bot: ", error);
  }
};

export const deleteBot = async (user_email, bot_name) => {
  try {
    fetch("http://localhost:9000/DeleteBotApi", {
      method: "POST",
      body: JSON.stringify({
        //use email and bot name to find and delete bot
        user_email: user_email,
        bot_name: bot_name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("ERROR Deleting bot: ", error);
  }
};
