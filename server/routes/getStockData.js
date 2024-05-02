const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.post("/", async (req, res) => {
  var stockData = [];
  const userBots = req.body.userBots;

  for (var i = 0; i < userBots.length; i++) {
    try {
      // Make HTTP request to Yahoo Finance page
      const response = await axios.get(
        "https://finance.yahoo.com/quote/" + userBots[i].stockSymbol
      );

      // Load HTML content into Cheerio
      const $ = cheerio.load(response.data);

      // Target the HTML element containing the stock price (inspect the webpage to find the correct selector)
      const stockPrice = $("fin-streamer").eq(18).text();
      const stockDollarChange = $("fin-streamer").eq(19).text(); // Example selector
      const stockPercentChange = $("fin-streamer").eq(20).text(); // Example selector

      stockData.push({
        stockSymbol: userBots[i].stockSymbol,
        stockPrice: stockPrice,
        stockDollarChange: stockDollarChange,
        stockPercentChange: stockPercentChange,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  res.json(stockData);
});

module.exports = router;
