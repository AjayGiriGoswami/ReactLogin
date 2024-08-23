import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { LoginContext } from "../Context/Context";

const Login = () => {
  const [passShow, setpassShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUsers } = useContext(LoginContext);

  const HandleLogin = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Please Enter your Email", {
        position: "top-center",
      });
    } else if (!email.includes("@") || !email.includes(".com")) {
      toast.warn("Please enter the Valid Email Address", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("Please Enter your Password", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.warn("Plase Enter the Pssword min 6 Charcter", {
        position: "top-center",
      });
    } else {
      axios.defaults.withCredentials = true;
      const res = await axios.post("http://localhost:5000/auth/Login", {
        email,
        password,
      });
      console.log(res);

      // Login Successfully
      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        toast.success("Login Successfully", {
          position: "top-center",
        });
        navigate("/");
        setUsers(res.data.result.preuser);
      }
      // Wrong Password
      else if (res.data === "Wrong Password") {
        toast.warn("Wrong Password", {
          position: "top-center",
        });
      }
      // User is Not Existed
      else if (res.data === "Existed") {
        toast.info("User is Not Existed", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="login-container ">
      <h1>Login</h1>

      <form onSubmit={HandleLogin}>
        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

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
        <button type="submit">Login</button>
        <p>
          Don’t have an account? <Link to="/Signup">Create Account</Link>
        </p>
        <p className="mt-0">
          Forot Password? <Link to="/Forgot">Check Here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
