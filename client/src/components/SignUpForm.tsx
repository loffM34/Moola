import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userCheck } from "../scripts/authCheck";
import { confirmPassMatch, validateEmail } from "../scripts/signUpValidation";
import { createNewUser } from "../scripts/newUserHandler";
import { setAuthContext } from "../scripts/authContext";

const containerStyles: React.CSSProperties = {
  padding: "25px 3%",
  textAlign: "center",
  margin: "auto",
  width: "600px",
  border: "1px solid #DBD8D0",
  borderRadius: "8px",
  marginTop: "100px",
};

const inputContainerStyles: React.CSSProperties = {
  maxWidth: "400px",
  margin: "auto",
  width: "100%",
};

const buttonStyles: React.CSSProperties = {
  textAlign: "center",
};

function SignUpForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //validate passwords and confirmPass

  // logic for submit button
  async function submit(e) {
    e.preventDefault();

    if (!email || !password || !confirmPass || !firstName || !lastName) {
      alert("Please fill in all the fields");
      return; // Exit the function early
    }

    try {
      const userStatus = await userCheck(email.toLowerCase());
      // if sign up user already exists dont create account
      if (userStatus.status != "exist") {
        if (confirmPassMatch(password, confirmPass) && validateEmail(email)) {
          //Add user to database
          createNewUser(
            email.toLowerCase(),
            password,
            firstName.toLowerCase(),
            lastName.toLowerCase()
          );
          const user = {
            email: email,
            firstName: firstName,
            lastName: lastName,
          };
          console.log(user);
          //set UserContext before signing in
          setAuthContext(user.email, user.firstName, user.lastName);
          //direct to dashboard
          navigate("/UserDash");
        }
        //alret if invalid email or password
        else {
          alert("invalid email or password");
        }
      } else {
        alert("User Already Exists");
      }
    } catch (error) {
      alert("wrong details");
      console.error(error);
    }
  }

  return (
    <>
      <div id="signUp-header" style={containerStyles}>
        <h1>Sign Up</h1>
        <h3>
          Already a member? <a href="/Login">Log In</a>
        </h3>

        <div className="input-group mb-3" style={inputContainerStyles}>
          <input
            type="text"
            required
            className="form-control"
            placeholder="First name"
            aria-label="firstName"
            aria-describedby="firstName-Input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="input-group mb-3" style={inputContainerStyles}>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Last name"
            aria-label="lastName"
            aria-describedby="lastName-Input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input-group mb-3" style={inputContainerStyles}>
          <input
            type="text"
            id="emailInput"
            required
            className="form-control"
            placeholder="Email: "
            aria-label="email"
            aria-describedby="email-Input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value), validateEmail(e.target.value);
            }}
          />
        </div>

        <div className="input-group mb-3" style={inputContainerStyles}>
          <input
            type="password"
            id="passInput"
            required
            className="form-control"
            placeholder="Password:"
            aria-label="password"
            aria-describedby="password-Input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value),
                confirmPassMatch(e.target.value, confirmPass);
            }}
          />
        </div>

        <div className="input-group mb-3" style={inputContainerStyles}>
          <input
            type="password"
            id="confirmPassInput"
            required
            className="form-control"
            placeholder="Confirm password:"
            aria-label="confirmPass"
            aria-describedby="confirmPass-Input"
            onChange={(e) => {
              setConfirmPassword(e.target.value),
                confirmPassMatch(password, e.target.value);
            }}
          />
        </div>
        <div style={buttonStyles}>
          <button type="submit" className="btn btn-primary" onClick={submit}>
            Create An Account
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
