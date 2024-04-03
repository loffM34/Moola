const express = require("express");
const router = express.Router();
const UserData = require("../mongo");
const { exec } = require("child_process");

async function getAllUsers() {
  try {
    const users = await UserData.find({});

    const usersArray = users.map((user) => user.toObject());
    return usersArray;
  } catch (error) {
    console.error("Error fetching users: ", error);
  }
}

module.exports = async function runUserBots(logger) {
  const pid = process.pid;
  console.log("Process PID: ", pid)
  try {
    const users = await getAllUsers();
    //loop through all of the users in the users array (Nested for loops is ineffiecent but maybe nice have fix later)
    for (var i = 0; i < users.length; i++) {
      //for each of the users bot run the python script that runs the trading bot
      for (var j = 0; j < users[i].userBots.length; j++) {
        //set up for values needed to run the python script
        var botName = users[i].userBots[j].botName.replace(/\s/g, "");
        var alpacaKey = users[i].userBots[j].alpacaKey;
        var alpacaSecret = users[i].userBots[j].alpacaSecret;
        var stockSymbol = users[i].userBots[j].stockSymbol;
        var tradingStrat = users[i].userBots[j].tradingStrat;
        var startCash = users[i].userBots[j].startCash;
        var riskPercentage = users[i].userBots[j].riskPercent;
        var tradeProfitOrder = users[i].userBots[j].tradeProfitOrder;

        if (tradingStrat == "dayTrader") {
          python_file = "dayTrader.py";
        } else if (tradingStrat == "intermediateTrader") {
          python_file = "intermediateTrader.py";
        } else if (tradingStrat == "longTermTrader") {
          python_file = "longTermTrader.py";
        } else {
          python_file = "DNE.py";
          console.log("ERROR SETTING PYTHON FILE NAME");
        }

        command =
          "python " +
          python_file +
          " " +
          botName +
          " " +
          alpacaKey +
          " " +
          alpacaSecret +
          " " +
          stockSymbol +
          " " +
          tradingStrat +
          " " +
          startCash +
          " " +
          riskPercentage +
          " " +
          tradeProfitOrder;

        exec(command, (error, stdout, stderr) => {
          //error in running python code
          if (error) {
            console.log("exec error:", error);
            return;
          }
          //python file output
          console.log("stdout: ", stdout);
        });
      }
    }
  } catch (error) {
    console.error("Error fetching users: ", error);
  }
};
