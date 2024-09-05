import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import bgLogin from "../Images/bgLogin.jpg";
import context from "../Context/createContext";
import { useNavigate } from "react-router-dom";
import "./style.css";

import SampleLogin from "./SampleLogin";

function Login() {
  const navigate = useNavigate();

  const [cred, setCred] = useState({
    username: "",
    password: "",
  });
  const c = useContext(context);

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    const result = await c.login(cred.username, cred.password);
    localStorage.setItem("isAdmin", "false");
    if (result) {
      navigate("/dashboard");
    }
  };
  return (
    <>
      <div
        className="complete_screen d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${bgLogin})`,
          backgroundRepeat: "no-repeat",
          height: "99vh",
        }}
      >
        <div
          className="login_box container rounded py-4 px-3 rounded"
          style={{ backgroundColor: "white", width: "auto" }}
        >
          <div className="fs-4 fw-bold top text-center my-2  ">Login</div>
          <div
            className="mb-3 row my-2 d-flex flex-column fw-semibold"
            style={{ fontSize: "12px" }}
          >
            <label
              htmlFor="staticEusername"
              className="col-sm-2 col-form-label mx-3"
            >
              Username
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className=" fw-bold fs-6 form-control-plaintext mx-3 px-1 border-bottom"
                placeholder="Enter atleast 6 character"
                name="username"
                onChange={onChange}
                style={{ fontFamily: "Kanit" }}
              />
            </div>
          </div>
          <div
            className="mb-3 row my-2 d-flex flex-column fw-semibold"
            style={{ fontSize: "12px" }}
          >
            <label
              htmlFor="inputPassword"
              className="col-sm-2 col-form-label mx-3"
            >
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="fw-bold form-control-plaintext mx-3 px-1 border-bottom"
                id="inputPassword"
                name="password"
                onKeyDown={(e) => {
                  if (e.keyCode == 13) {
                    handleSubmit();
                  }
                }}
                onChange={onChange}
                placeholder="Type your password"
              />
            </div>
          </div>
          <div className="col-auto text-center my-5">
            <button
              type="submit"
              className="btn btn-primary border-0 "
              style={{
                width: "20vw",
                color: "rgb(64, 63, 61)",
                backgroundImage: `url(${bgLogin})`,
              }}
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <div
            className="havent mx-5 my-2"
            style={{ color: "grey", fontSize: "14px" }}
          >
            Haven't sign up?{" "}
            <Link
              to="/signup"
              className=" text-decoration-none"
              style={{ color: "black", fontSize: "14px" }}
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="sample-login">
          <SampleLogin demoname={"madhav"} demopass={"12345"} />
        </div>
      </div>
    </>
  );
}

export default Login;
