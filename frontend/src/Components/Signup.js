import React, { useContext, useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

import context from '../Context/createContext'
import { useNavigate } from 'react-router-dom'


function Signup() {
  const navigate = useNavigate();
  const [canSubmit, setCanSubmit] = useState(false);
  const [cred, setCred] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const c = useContext(context);
   useEffect(() => {
      if(localStorage.getItem("token")){
        navigate('/dashboard');
      }
    }, [])

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
    const a = document.getElementById('confirmPassword')
    if (cred.password != a.value && e.target.name === 'confirmPassword') {
      a.style.borderColor = "red";
    }
    else {
      a.style.borderColor = "";
    }
    if (cred.username.length >= 6 && cred.password.length > 0 && cred.password === cred.confirmPassword) {
      setCanSubmit(true);
    }
    else {
      setCanSubmit(false);
    }

  }
  const handleSubmit = async () => {
    const a = document.getElementById('confirmPassword')
    const b = document.getElementById('password')
    let result = null;
    if (a.value != b.value) {
      c.setMsg('Enter same password');
      // return console.log("Password does't match")
    }
    else {
      result = await c.signUp(cred.username, cred.password);
    }
    if (result) {
      c.setMsg('Welcome', cred.username)
      localStorage.setItem('isAdmin', 'false');

      setTimeout(() => {
        navigate('/dashboard');

      }, 2000)
    }
  }
  return (
    <>
      <div className='complete_screen d-flex justify-content-center align-items-center ' >
        <div className=' login_box rounded py-2 px-3 border' >
          <div className="fs-2 fw-bold top text-center my-4  ">Let's Begin!</div>
          <div className="mb-3 row my-2 d-flex flex-column fw-semibold">
            <label htmlFor="staticEusername" className=" mx-3 fs-6 ">Name</label>
            <div className="col-sm-10">
              <input type="text" className="fw-bold form-control-plaintext mx-3 px-1 border-bottom login-input " placeholder="Username" name='username' onChange={onChange} />
            </div>
          </div>
          <div className="mb-3 row my-2 d-flex flex-column fw-semibold" >
            <label htmlFor="inputPassword" className=" mx-3 fs-6 ">Password </label>
            <div className="col-sm-10">
              <input id='password' type="password" name='password' onChange={onChange} className="fw-bold form-control-plaintext mx-3 px-1 border-bottom login-input " placeholder="Enter password" />
            </div>
          </div>
          <div className="mb-3 row my-2 d-flex flex-column fw-semibold">
            <label htmlFor="inputPassword" className=" mx-3 fs-6 ">Confirm Password</label>
            <div className="col-sm-10">
              <input type="password" className="fw-bold form-control-plaintext mx-3 px-1 border-bottom login-input " placeholder="Enter password" onChange={onChange} id="confirmPassword" name='confirmPassword' />
            </div>
          </div>
          <div className="col-auto text-center my-4">
            <button type="submit" className="login-submit rounded-pill p-2 fw-bold border-0 " disabled={!canSubmit} onClick={handleSubmit}>SignUp</button>

            <div className="havent mx-5 my-2" >
              <Link to="/login" className="text-muted text-decoration-none" style={{ color: "black", fontSize: "14px" }}>Login</Link>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup