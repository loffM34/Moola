const mongoose = require("mongoose");
const uri =
  "mongodb+srv://loffm34:RFMjuJIAFNM1gt7e@capstonedb.vfyxald.mongodb.net/TradingAiData";
mongoose
  .connect(uri)
  .then(async () => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
  });

const userDataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  userBots: {
    type: Array,
  },
});

const UserData = mongoose.model("userData", userDataSchema, "userData");

module.exports = UserData;
