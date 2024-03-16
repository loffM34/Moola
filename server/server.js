const express = require("express");
const dotenv = require("dotenv");

//load enviorment variables
dotenv.config();

const cors = require("cors");
const app = express();
const newBot = require("./routes/newBot");
const deleteBot = require(".//routes/deleteBot");
const userAuth = require("./routes/userAuth");
const newUser = require("./routes/newUser");
const getBotArray = require("./routes/getBotArray");
const runTradeBot = require("./routes/runTradeBot");
const getStocks = require("./routes/getStocks");
const PORT = 9000;
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

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://loffm34:bD2MIR6Aq0Yq3Pho@capstonedb.vfyxald.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// app.use("/LoginApi", userAuth);

// app.use("/SignUpApi", userAuth);
