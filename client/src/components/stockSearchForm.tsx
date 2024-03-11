import React, { useState } from "react";

function StockSearchForm() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");

  async function handleStockSearch(query) {
    try {
      const response = await fetch(
        "http://localhost:9000/GetStocks?query=" + query
      );
      console.log("query ", query);
      console.log("response", response);
      if (!response.ok) {
        console.error("Failed to search Stocks");
        setSearchResults([]);
        return;
      }
      const data = await response.json();
      setSearchResults(data.results);
      console.log("data: ", data);
      console.log("search Results ", data);
    } catch (error) {
      console.error("error searching stocks: ", error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const query = e.target.elements.searchQuery.value;
    if (query) {
      handleStockSearch(query);
    }
  }

  return (
    <>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control me-2"
          name="searchQuery"
          placeholder="Enter stock symbol"
        />
        <button
          className="btn btn-outline-success"
          id="searchButton"
          type="submit"
        >
          Search
        </button>
      </form>

      <select
        className="form-select"
        value={selectedStock}
        onChange={(e) => setSelectedStock(e.target.value)}
      >
        <option hidden>Select a stock</option>
        {searchResults.map((result, index) => (
          <option className="drop-item" key={index} value={result.ticker}>
            {result.ticker}
          </option>
        ))}
      </select>
    </>
  );
}

export default StockSearchForm;
