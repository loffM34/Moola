// test password using regex for must contain 8 characters one special character and one number
const validatePassword = (password) => {
  const passRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passRegex.test(password);
};

export const confirmPassMatch = (password, confirmPass) => {
  const passwordField = document.getElementById("passInput");
  const confirmPassField = document.getElementById("confirmPassInput");

  if (password === confirmPass && validatePassword(password)) {
    passwordField.style.backgroundColor = "lightgreen";
    confirmPassField.style.backgroundColor = "lightgreen";
    return true
  } else {
    passwordField.style.backgroundColor = "white";
    confirmPassField.style.backgroundColor = "white";
    return false
  }

};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const emailField = document.getElementById("emailInput");

  if (emailRegex.test(email)) {
    emailField.style.backgroundColor = "lightgreen";
  } else {
    emailField.style.backgroundColor = "white";
  }
  return emailRegex.test(email);
};
