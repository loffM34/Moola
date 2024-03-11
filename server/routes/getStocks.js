const express = require("express");
const router = express.Router();

("use strict");

router.get("/", async (req, res) => {
  try {
    const query = req.query.query;

    const url =
      "https://api.polygon.io/v3/reference/tickers?market=stocks&search=" +
      query +
      "&active=true&limit=10&apiKey=HkekUkMdHzgwQuFFuagHBnp9OIKiWRux";
    // "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" +
    // query +
    // "&apikey=W1STZFWA9QLSP4PH";

    const response = await fetch(url);

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
