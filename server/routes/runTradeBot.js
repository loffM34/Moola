const express = require("express");
const { exec } = require("child_process");
const router = express.Router();

// What this should do!!!!
//  Run a CRONT job  each bot in the userBot array
//
//
//

//post method for running python files
router.post("/", async (req, res) => {
  const bot_name = req.body.bot_name;
  const alpaca_key = req.body.alpaca_key;
  const alpaca_secret = req.body.alpaca_secret;
  const stock_symbol = req.body.stock_symbol;
  const trading_strat = req.body.trading_strat;
  const start_cash = req.body.start_cash;
  const risk_percentage = req.body.risk_percentage;
  const trade_profit_order = req.body.trade_profit_order;

  console.log(trading_strat);
  if (trading_strat == "dayTrader") {
    python_file = "dayTrader.py";
  } else if (trading_strat == "intermediateTrader") {
    python_file = "intermediateTrader.py";
  } else if (trading_strat == "longTermTrader") {
    python_file = "longTermTrader.py";
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
    stock_symbol +
    " " +
    risk_percentage +
    " " +
    trade_profit_order;

  exec(command, (error, stdout, stderr) => {
    //error in running python code
    if (error) {
      console.log("exec error:", error);
      res
        .status(500)
        .json({ error: "an error occured while executing pyhton file" });
      return;
    }
    //python file output
    console.log("stdout: ", stdout);
    res.json({ output: stdout });
  });
});

module.exports = router;
