import React, { useState } from "react";

function StockSearchForm() {
  const [searchResults, setSearchResults] = useState([]);

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
        <button className="btn btn-outline-success" id="searchButton" type="submit">
          Search
        </button>
      </form>

      <ul className="searchResults">
        {searchResults.map((result, index) => (
          <li key={index}>{result.ticker}</li>
        ))}
      </ul>
    </>
  );
}

export default StockSearchForm;
