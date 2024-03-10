const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  userBots: Array,
});

const User = mongoose.model("User", UserSchema, "userData");

router.post("/", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      userBots: [],
    });

    return newUser.save();
  } catch (e) {
    console.error("Error Creating new User ", e);
    res.json("server fail");
  }
});

module.exports = router;
