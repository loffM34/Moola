export const userCheck = async (email) => {
  try {
    // console.log(email, password);
    // const response = await axios.post("http://localhost:9000/LoginApi", {
    //   email,
    //   password,
    // });
    const response = await fetch("http://localhost:9000/UserCheckApi", {
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

// export const signUp = async (email) => {
//   try {
//     const response = await fetch("http://localhost:9000/SignUpApi/signup", {
//       method: "POST",
//       body: JSON.stringify({
//         email: email,
//       }),

//       headers: {
//         "Content-Type": "application/json",
//       }

//     });

//     const data = await response.json();

//     return data;

//     // return result;
//   } catch (error) {
//     console.error(error);
//   }
// };
