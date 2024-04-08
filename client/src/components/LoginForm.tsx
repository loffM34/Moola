import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userCheck } from "../scripts/authCheck";
import { setAuthContext } from "../scripts/authContext";

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

const forgotPassStyles: React.CSSProperties = {
  paddingRight: "260px",
};

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const result = await userCheck(email);
      console.log(result)
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

  // async function submit(e) {
  //   e.preventDefault();
  //
  //   try {
  //     await axios
  //       .post("http://localhost:5173/Login", {
  //         email,
  //         password,
  //       })
  // .then((res) => {
  //   if (res.data == "exist") {
  //     history("/UserDash", { state: { id: email } });
  //   } else if (res.data == "notexist") {
  //     alert("User does not exist");
  //   }
  // })
  // .catch((error) => {
  //   alert("wrong details");
  //   console.error(error);
  // });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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
        <a style={forgotPassStyles}>Forgot Password?</a> <br></br>
        <button type="button" className="btn btn-primary" onClick={submit}>
          Login
        </button>
      </div>
    </>
  );
}

export default LoginForm;
