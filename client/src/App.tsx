import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { clearAuthContext } from "./scripts/authContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NoPage from "./pages/NoPage";
import UserDash from "./pages/UserDash";
import Analytics from "./pages/Analytics";

function App() {
  //Logic for clearing userdata but breaks when creating new bot or refreshing page
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     clearAuthContext();
  //     localStorage.removeItem("token");
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/UserDash" element={<UserDash />} />
          <Route path="/BotAnalytics" element={<Analytics />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
