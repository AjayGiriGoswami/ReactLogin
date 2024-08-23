import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const [passShow, setpassShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");

  const HandleSignup = async (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Please Enter Your Name");
    } else if (email === "") {
      toast.error("Please Enter Your Email");
    } else if (!email.includes("@") || !email.includes(".com")) {
      toast.warning("Please the Enter the Vaild Email Address");
    } else if (number === "") {
      toast.error("Please Enter Your Number");
    } else if (number.length !== 10) {
      toast.warning("Phone number should be of 10 digits");
    } else if (password === "") {
      toast.error("Please Enter Your Password");
    } else if (password.length < 6) {
      toast.warn("Your password must contain at least 6 characters");
    } else {
      const res = await axios.post("http://localhost:5000/auth/Signup", {
        name,
        email,
        number,
        password,
      });
      // console.log(res)

      // Signup Sucessfully
      if (res.status === 201) {
        toast.success("Signup Sucessfully", {
          position: "top-center",
        });
        navigate("/");
      }
      // Already have a acoount
      else if (res.data === "Already have a acoount") {
        toast.warning("Already have a acoount", {
          position: "top-center",
        });
      }
    }
  };
  return (
    <div>
      <div className="login-container ">
        <h1>Create Account</h1>

        <form onSubmit={HandleSignup}>
          {/* Name */}
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Full Name"
          />

          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          {/* Number */}
          <label htmlFor="number">Number</label>
          <input
            type="number"
            name="email"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter your Number"
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
          <button type="submit">Create Account</button>
          <p>
            I have a Account? <Link to="/Login"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
