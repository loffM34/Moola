import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { userCheck } from "../scripts/authCheck";
import { setAuthContext } from "../scripts/authContext";
import "../styles/loginStyles.css"

const containerStyles: React.CSSProperties = {
  padding: "50px 3%",
  textAlign: "center",
  margin: "auto",
  width: "500px",
  border: "1px solid #DBD8D0",
  borderRadius: "8px",
  marginTop: "200px",
  backgroundColor:"white",
  position:"relative",
};

const inputContainerStyles: React.CSSProperties = {
  maxWidth: "400px",
  margin: "auto",
  width: "100%",
};





function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function forgotPasswordResponse(){
    alert("That's Unfortunate");
  }

  async function submit(e) {
    e.preventDefault();
    try {
      const result = await userCheck(email);
      if (result.status === "exist") {
        const token = result.token;
        if (password === result.user.password) {
          setAuthContext(
            result.user.email,
            result.user.firstName,
            result.user.lastName
          );
          //store token in local stoage
          localStorage.setItem('token',token)
          navigate("/UserDash");
        } else {
          alert("Inncorect Password");
        }
      } else if (result.status === "notexist") {
        alert("User does not exist");
      }
    } catch (error) {
      alert("wrong details");
      console.error(error);
    }
  }


  return (
    <>
      <div style={containerStyles}>
        <div id="login-header">
          <h1>Log In</h1>
          <h3>
            New User? <a href="/SignUp">Sign Up</a>
          </h3>
        </div>
        <div className="input-group mb-3" style={inputContainerStyles}>
          <input
            type="text"
            className="form-control"
            placeholder="Email: "
            aria-label="email"
            aria-describedby="email-Input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group mb-3" style={inputContainerStyles}>
          <input
            type="password"
            className="form-control"
            placeholder="Password:"
            aria-label="password"
            aria-describedby="password-Input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a className="forgotPassStyles" onClick={forgotPasswordResponse}>Forgot Password?</a> <br></br>
        <button type="button" className="btn btn-primary" onClick={submit}>
          Login
        </button>
      </div>
    </>
  );
}

export default LoginForm;
