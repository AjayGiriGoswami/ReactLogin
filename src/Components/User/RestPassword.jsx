import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const RestPassword = () => {
  const [passShow, setpassShow] = useState(false);
  const [password, setPassword] = useState("");
  const { id, token } = useParams();
  const navigate = useNavigate("");

  const HandleRestPassword = async (e) => {
    e.preventDefault();
    if (password === "") {
      toast.error("Please Enter your Password", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.warn("Plase Enter the Pssword min 6 Charcter", {
        position: "top-center",
      });
    } else {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `http://localhost:5000/auth/Rest-Password/${id}/${token}`,
        {
          password,
        }
      );

      // Sent the Link in Email
      if (res.status === 201) {
        toast.success("Password is Updated", {
          position: "top-center",
        });
        navigate("/Login");
      }
      // User is Not Existed
      else if (res.data === "Error") {
        toast.info("Link is Expires", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <>
      <div>
        <div className="login-container ">
          <h1>Rest Password</h1>

          <form onSubmit={HandleRestPassword}>
            {/* Password */}
            <label htmlFor="password">Password</label>
            <input
              type={!passShow ? "password" : "text"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            {/* Show Password and Hide Password */}
            <label>
              &nbsp;
              <input
                type="checkbox"
                onClick={() => setpassShow(!passShow)}
                style={{ cursor: "pointer" }}
              />
              <span>
                {" "}
                {!passShow ? (
                  <span>Hide Password</span>
                ) : (
                  <span>Show Password</span>
                )}
              </span>
            </label>

            {/* Submit Button */}
            <button type="submit">Rest-Password</button>
            <p>
              Go Back To Login Back? <Link to="/Login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default RestPassword;
