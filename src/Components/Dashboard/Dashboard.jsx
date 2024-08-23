import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { LoginContext } from "../Context/Context";

const Dashboard = () => {
  const navigate = useNavigate();
  const [Show, setShow] = useState(false);
  const { users, setUsers } = useContext(LoginContext);

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
    // console.log(res);
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
    <div>
      {Show ? (
        <>
          {users ? (
            <>
              <h1>{users.email}</h1>
            </>
          ) : (
            <></>
          )}
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
    </div>
  );
};

export default Dashboard;
