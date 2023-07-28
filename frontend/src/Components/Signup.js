import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import bgLogin from '../Images/bgLogin.jpg'

import context from '../Context/createContext'
import { useNavigate } from 'react-router-dom'


function Signup() {
  const navigate = useNavigate();

  const [cred, setCred] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const c = useContext(context);

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
    const a = document.getElementById('confirmPassword')
    if (cred.password != a.value && e.target.name === 'confirmPassword') {
      a.style.borderColor = "red";
    }
    else {
      a.style.borderColor = "";

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
      <div className='complete_screen d-flex justify-content-center align-items-center' style={{ backgroundImage: `url(${bgLogin})`, backgroundRepeat: "no-repeat", height: "99vh" }}>
        <div className=' login_box containerrounded py-4 px-3 rounded' style={{ backgroundColor: "white", height: "80%", width: "auto" }} >

          <div className="mb-3 row my-2 d-flex flex-column fw-semibold" style={{ fontSize: "12px" }}>
            <label htmlFor="staticEusername" className="col-sm-2 col-form-label mx-3">Name</label>
            <div className="col-sm-10">
              <input type="text" className="fs-6 form-control-plaintext mx-3 px-1 border-bottom" placeholder="Username" name='username' onChange={onChange} style={{ fontFamily: 'Kanit' }} />
            </div>
          </div>
          <div className="mb-3 row my-2 d-flex flex-column fw-semibold" style={{ fontSize: "12px" }}>
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label mx-3">Password</label>
            <div className="col-sm-10">
              <input id='password' type="password" name='password' onChange={onChange} className="fs-6 form-control-plaintext mx-3 px-1 border-bottom" placeholder="Enter password" style={{ fontFamily: 'Kanit' }} />
            </div>
          </div>
          <div className="mb-3 row my-2 d-flex flex-column fw-semibold" style={{ fontSize: "12px" }}>
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label mx-3">Confirm Password</label>
            <div className="col-sm-10">
              <input type="password" className="fs-6 form-control-plaintext mx-3 px-1 border-bottom" placeholder="Enter password" onChange={onChange} style={{ fontFamily: 'Kanit' }} id="confirmPassword" name='confirmPassword' />
            </div>
          </div>
          <div className="col-auto text-center my-4">
            <button type="submit" className="btn btn-primary border-0 " style={{ width: "20vw", color: "rgb(64, 63, 61)", backgroundImage: `url(${bgLogin})` }} onClick={handleSubmit}>SignUp</button>
            <div className="havent mx-5 my-3" style={{ color: "grey", fontSize: "14px" }}><Link to="/login" className=" text-decoration-none" style={{ color: "black", fontSize: "14px" }}>Login</Link></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup