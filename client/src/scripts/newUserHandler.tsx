export const createNewUser = async (email, password, firstName, lastName) => {
  try {
    const response = await fetch("http://localhost:9000/CreateUserApi", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    
    console.log(data)
    

    return data;

    // return result;
  } catch (error) {
    console.error(error);
  }
};
