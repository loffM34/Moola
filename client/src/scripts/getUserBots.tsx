export const getUserBots = async (email) => {
  try {
    const response = await fetch("http://localhost:9000/GetUserBots", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data;

    // return result;
  } catch (error) {
    console.error(error);
  }
};
