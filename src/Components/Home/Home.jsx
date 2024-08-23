import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../Context/Context";

const Home = () => {
  const { users } = useContext(LoginContext);

  return (
    <>
      {users ? (
        <>
          <button className="d-flex align-items-center">
            <Link
              to="/Dashboard"
              className="text-decoration-none"
              style={{ color: "white" }}
            >
              Dashboard
            </Link>
          </button>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
