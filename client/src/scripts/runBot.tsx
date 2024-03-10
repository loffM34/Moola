export const runBot = async () => {
  try {
    //call backend post method to run python script
    await fetch("http://localhost:9000/runBotApi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};
