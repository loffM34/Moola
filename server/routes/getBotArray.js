const express = require("express");
const router = express.Router();
const UserData = require("../mongo");

router.post("/", async (req, res) => {
  const user_email = req.body.email;
  try {
    const user = await UserData.findOne({ email: user_email });

    const userBotArray = user.userBots;

    res.json({ botArray: userBotArray });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
