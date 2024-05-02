const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserData = require("../mongo");
const { exec } = require("child_process");

router.post("/", async (req, res) => {
  const user_email = req.body.user_email;
  const bot_name = req.body.bot_name;
  const alpaca_key = req.body.alpaca_key;
  const alpaca_secret = req.body.alpaca_secret;
  const alpaca_endpoint = req.body.alpaca_endpoint;
  const stock_symbol = req.body.stock_symbol;
  const trading_strat = req.body.trading_strat;
  const risk_percentage = req.body.risk_percentage;
  const trade_profit_order = req.body.trade_profit_order;

  try {
    const user = await UserData.findOne({ email: user_email });
    var botNameTaken = false;
    for (let i = 0; i < user.userBots.length; i++) {
      if (user.userBots[i].botName == bot_name) {
        botNameTaken = true;
        break;
      }
    }

    if (botNameTaken) {
      res.json({ status: "name taken" });
      return;
    } else {
      res.json({ status: "name avaiable" });
    }

    await user.updateOne({
      $push: {
        userBots: {
          botName: bot_name,
          alpacaKey: alpaca_key,
          alpacaSecret: alpaca_secret,
          alpacaEndpoint: alpaca_endpoint,
          stockSymbol: stock_symbol,
          tradingStrat: trading_strat,
          riskPercent: risk_percentage,
          tradeProfitOrder: trade_profit_order,
          transactionHistory: [],
        },
      },
    });
    console.log("successfully added");

    if (trading_strat == "dayTrader") {
      python_file = "../server/botPythonScripts/dayTrader.py";
    } else if (trading_strat == "intermediateTrader") {
      python_file = "../server/botPythonScripts/intermediateTrader.py";
    } else if (trading_strat == "longTermTrader") {
      python_file = "../server/botPythonScripts/longTermTrader.py";
    } else {
      python_file = "DNE.py";
      console.log("ERROR SETTING PYTHON FILE NAME");
    }

    command =
      "python " +
      python_file +
      " " +
      alpaca_key +
      " " +
      alpaca_secret +
      " " +
      alpaca_endpoint +
      " " +
      stock_symbol +
      " " +
      risk_percentage +
      " " +
      trade_profit_order;

    exec(command, (error, stdout, stderr) => {
      //error in running python code
      if (error) {
        console.log("exec error:", error);
      }
      //python file output
      console.log("stdout: ", stdout);
    });
  } catch (error) {
    console.error(error);
  }

  //find the user and add array of objects if not already exisiting and then create add a new bot with parameters into the file
});

module.exports = router;
