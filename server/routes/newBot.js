const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserData = require("../mongo");

router.post("/", async (req, res) => {
  const user_email = req.body.user_email;
  const bot_name = req.body.bot_name;
  const alpaca_key = req.body.alpaca_key;
  const alpaca_secret = req.body.alpaca_secret;
  const stock_symbol = req.body.stock_symbol;
  const trading_strat = req.body.trading_strat;
  const start_cash = req.body.start_cash;
  const risk_percentage = req.body.risk_percentage;
  const trade_profit_order = req.body.trade_profit_order;

  try {
    const user = await UserData.findOne({ email: user_email });
    await user.updateOne({
      $push: {
        userBots: {
          botName: bot_name,
          alpacaKey: alpaca_key,
          alpacaSecret: alpaca_secret,
          stockSymbol: stock_symbol,
          tradingStrat: trading_strat,
          startCash: start_cash,
          riskPercent: risk_percentage,
          tradeProfitOrder: trade_profit_order,
        },
      },
    });
    console.log("successfully added")
  } catch (error) {
    console.error(error);
  }

  //find the user and add array of objects if not already exisiting and then create add a new bot with parameters into the file
});

module.exports = router;
