const express = require("express");
const router = express.Router();

("use strict");

router.get("/", async (req, res) => {
  console.log("YO")

  try {
    const url =
      "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=W1STZFWA9QLSP4PH";

    const response = await fetch(url);

    console.log("Response", response);

    if (!response.ok) {
      console.log("HTTP Error! status:", response.status);
    }

    const data = await response.json();

    console.log("data", data);

    res.json(data);
  } catch (error) {
    console.error("Error: ", error);
  }
});

module.exports = router;
