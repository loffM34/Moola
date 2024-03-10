export const setAuthContext = async (email, firstName, lastName) => {
  const user = {
    email: email,
    firstName: firstName,
    lastName: lastName,
  };

  localStorage.setItem("user", JSON.stringify(user));
};

export const getAuthContext = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearAuthContext = () => {
  try {
    localStorage.removeItem("user");
    console.log("User Context Removed");
  } catch (error) {
    console.error("Error Clearing User Context ", error);
  }
};
