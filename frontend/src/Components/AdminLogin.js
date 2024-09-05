import React, { useContext, useState } from "react";

import bgLogin from "../Images/bgLogin.jpg";
import context from "../Context/createContext";
import { useNavigate } from "react-router-dom";

import SampleLogin from "./SampleLogin";

import "./style.css";

function AdminLogin() {
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
    const result = await c.adminlogin(cred.username, cred.password);

    if (result) {
      localStorage.setItem("isAdmin", "true");
      navigate("/dashboard");
    }
  };
  return (
    <>
      <div
        className="complete_screen d-flex justify-content-center align-items-center"
        style={{ backgroundImage: `url(${bgLogin})` }}
      >
        <div
          className="login_box container rounded py-4 px-3 rounded"
          style={{ backgroundColor: "white", width: "auto" }}
        >
          <div className="fs-4 fw-bold top text-center my-2  ">Admin Login</div>
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
                className="fs-6 fw-bold form-control-plaintext mx-3 px-1 border-bottom"
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
        </div>
        <div className="sample-login">
          <SampleLogin demoname={"madhav1"} demopass={"123456"}/>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
