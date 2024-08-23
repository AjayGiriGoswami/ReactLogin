import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

  const HandleForgot = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Please Enter your Email", {
        position: "top-center",
      });
    } else if (!email.includes("@") || !email.includes(".com")) {
      toast.warn("Please enter the Valid Email Address", {
        position: "top-center",
      });
    } else {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        "http://localhost:5000/auth/Forgot-Password",
        {
          email,
        }
      );
      // console.log(res);

      // Sent the Link in Email
      if (res.status === 201) {
        toast.success("Email has been sent Successfully!", {
          position: "top-center",
        });
        navigate("/Login")
      }
      // User is Not Existed
      else if (res.data === "Existed") {
        toast.info("Email is Not Existed", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div>
      <div className="login-container ">
        <h1>Forgot Password</h1>

        <form onSubmit={HandleForgot}>
          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          {/* Submit Button */}
          <button type="submit">Send</button>
          <p>
            Go Back To Login Back? <Link to="/Login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
