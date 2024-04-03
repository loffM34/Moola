const express = require("express");
const router = express.Router();
const UserData = require("../mongo");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  console.log("fired");
});

router.post("/", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await UserData.findOne({ email: email });
    if (user != null) {
      //generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5s",
      });
      //send user exists and token to client
      res.json({ status: "exist", user: user, token: token });
    } else {
      res.json({ status: "notexist" });
    }
  } catch (e) {
    console.error("server fail: ", e);
  }
});

module.exports = router;
