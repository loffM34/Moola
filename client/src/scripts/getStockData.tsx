export const getStockData = async (userBots) => {
  try {
    const response = await fetch("http://localhost:9000/GetStockDataApi", {
      method: "POST",
      body: JSON.stringify({
        //use email and bot name to find bot info
        userBots: userBots,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log("DATA BRUH", data);

    return data;
  } catch (error) {
    console.error("ERROR Finding bot: ", error);
  }
};
