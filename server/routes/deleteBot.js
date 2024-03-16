const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserData = require("../mongo");

router.post("/", async (req, res) => {
  const user_email = req.body.user_email;
  const bot_name = req.body.bot_name;

  try {
    const user = await UserData.findOne({ email: user_email });
    console.log("user", user);
    await user.updateOne({
      $pull: { userBots: { botName: bot_name } },
    });

    console.log("Bot Removed from user's bots");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
