const readline = require("readline");

const express = require("express");
const dotenv = require("dotenv");

//load enviorment variables
dotenv.config();

const cors = require("cors");
const app = express();

//server port
const PORT = 9000;

//cron job
const cron = require("node-cron");
const logger = console;
const runSheduledTask = require(".//cronJob/scheduledTask");

//server listeners
const newBot = require("./routes/newBot");
const deleteBot = require(".//routes/deleteBot");
const userAuth = require("./routes/userAuth");
const newUser = require("./routes/newUser");
const getBotArray = require("./routes/getBotArray");
const runTradeBot = require("./routes/runTradeBot");
const getStocks = require("./routes/getStocks");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/CreateBotApi", newBot);

app.use("/runBotApi", runTradeBot);

app.use("/CreateUserApi", newUser);

app.use("/UserCheckApi", userAuth);

app.use("/GetUserBots", getBotArray);

app.use("/GetStocks", getStocks);

app.use("/DeleteBotApi", deleteBot);

const server = app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});

let cronJobRef = null;
let cronJobPID = null;

//Cron job handling
app.get("/start-cron", (req, res) => {
  console.log("Received request to start cron job");
  console.log("cron job reference: ", cronJobRef);
  if (!cronJobRef) {
    cronJobRef = cron.schedule("* * * * *", () => {
      cronJobPID = runSheduledTask(logger);
    });
    console.log("cron job started");
    console.log("cron job reference: ", cronJobRef);
  } else {
    console.log("Cron job already running!");
  }
});

const handleShutdown = () => {
  //close server
  server.close(() => {
    console.log("server closed");
    process.exit(0);
  });
};

//listen for termination signals
process.on("SIGINT", handleShutdown);

// app.get("/stop-cron", (req, res) => {
//   console.log("Received request to stop cron job");

//   console.log("cron job ref before stopping: ", cronJobRef);
//   if (cronJobRef) {
//     console.log("cron PID", cronJobPID);
//     process.kill(cronJobPID);
//     cronJobRef = null;
//     console.log("Cron job stopped");
//   } else {
//     console.log("There is no cron job running");
//   }
// });
