const express = require("express");
const router = express.Router();
const UserData = require("../mongo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

// router.post("/signup", async (req, res) => {

//     const email = req.body.email;
//     const password = req.body.password;
//     const firstName = req.body.firstName
//     const lastName = req.body.lastName

//     try {
//       const user = await UserData.findOne({ email: email });

//     //   dont create new user if user exists
//       if (user != null) {
//         res.json({ status: "exist"});
//       } else {
//         const newUser = new User({
//             firstName: firstName,
//             lastName: lastName,
//             email: email,
//             password: password,
//         })
//         return newUser.save();
//       }
//     } catch (e) {
//       res.json("server fail");
//     }

// });

module.exports = router;
