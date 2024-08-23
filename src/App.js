import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/User/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./Components/User/Signup";
import Forgot from "./Components/User/Forgot";
import RestPassword from "./Components/User/RestPassword";
import Home from "./Components/Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Header/Header";
import Error from "./Components/Error/Error";
import { LoginContext } from "./Components/Context/Context";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const App = () => {
  const { users, setUsers } = useContext(LoginContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const DashVaild = async () => {
    let token = localStorage.getItem("token");
    console.log(token);
    const data = await fetch("http://localhost:5000/auth/verify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const res = await data.json();
    if (res.status === 201) {
      setUsers(res);
      navigate("/Dashboard");
    } else if (res.data === "no token") {
      toast.warning("Please Login", {
        position: "top-center",
      });
      navigate("/Login");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      DashVaild();
      setShow(true);
    }, 2000);
  });
  return (
    <>
      <Header />
      <ToastContainer />
      {show ? (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Forgot" element={<Forgot />} />
            <Route
              path="/Rest-Password/:id/:token"
              element={<RestPassword />}
            />
            <Route path="*" element={<Error />} />
            {/* <Route path="/" element={<Home/>}/> */}
          </Routes>
        </>
      ) : (
        <>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "90vh" }}
          >
            <Spinner animation="border" variant="danger" /> &nbsp;&nbsp; Loading
            .....
          </div>
        </>
      )}
    </>
  );
};

export default App;
