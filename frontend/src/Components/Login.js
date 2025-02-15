import React, { useContext, useState,useEffect } from "react";

import { Link } from "react-router-dom";
import context from "../Context/createContext";
import { useNavigate } from "react-router-dom";
import "./style.css";


function Login() {
  const navigate = useNavigate();
  const [canSubmit, setCanSubmit] = useState(false);

  const [cred, setCred] = useState({
    username: "",
    password: "",
  });
  const c = useContext(context);

  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate('/dashboard');
    }
  }, [])
  

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
    if (cred.username.length >= 6 && cred.password.length >= 1) {
      setCanSubmit(true);
    }
    else {
      setCanSubmit(false);
    }
  };
  const handleSubmit = async () => {

    const result = await c.login(cred.username, cred.password);
    if (result) {
      navigate("/dashboard");
    }
  };
  return (
    <>
      <div
        className="complete_screen">

        <div className="login_box shadow rounded py-3 border px-3 ">
          <div className="fs-2 fw-bold top text-center my-4  ">Welcome back!</div>
          <div
            className="mb-3 row my-2 d-flex flex-column fw-semibold ">
            <label
              htmlFor="staticEusername"
              className=" mx-3 fs-6">
              Username
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className=" fw-bold login-input form-control-plaintext mx-3 px-1 border-bottom"
                placeholder="Enter atleast 6 character"
                name="username"
                onChange={onChange}
              />
            </div>
          </div>
          <div
            className="mb-3 row my-2 d-flex flex-column fw-semibold "
          >
            <label
              htmlFor="inputPassword"
              className="col-sm-2 fs-6 col-form-label mx-3"
            >
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="fw-bold form-control-plaintext mx-3 px-1 border-bottom login-input"
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
              className="login-submit rounded-pill p-2 fw-bold border-0 "
              onClick={handleSubmit}
              disabled={!canSubmit}>
              Log In
            </button>
          </div>
          <div
            className=" mx-5 my-2 text-muted">
            New here?{" "}
            <Link to="/signup"
              className=" text-decoration-none text-muted fs-6">
              Sign Up
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}

export default Login;
