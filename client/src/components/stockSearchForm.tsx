function StockSearchForm() {
  async function handleStockSearch(query) {
    try {
      const response = await fetch(
        "http://localhost:9000/GetStocks?query=" + query
      );
      console.log("response", response);
      if (!response.ok) {
        console.error("Failed to search Stocks");
      }
      const data = await response.json();
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchQuery"
          placeholder="Enter stock symbol or keyword"
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
}

export default StockSearchForm;
