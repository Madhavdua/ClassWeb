import React, { useContext,useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import studentimg from '../Images/student.png'
import teacherimg from '../Images/teacher.png'
import context from '../Context/createContext'


const Navbar = () => {
  const c=useContext(context);
  const navigate = useNavigate();
  const [isAdmin,setisAdmin]=useState(false);
  useEffect(() => {
    
    setTimeout(() => {
      if(localStorage.getItem('isAdmin')==="true"){
        setisAdmin(true);
      }
    }, 1000);
  
  }, [])
  
  
  const handleLogout = () => {
    c.setprogress(20);
    c.setprogress(40);
    c.setprogress(60);
    localStorage.clear();
    setTimeout(()=>{
      c.setprogress(80);
      navigate('/')
      c.setprogress(100);
    },500)
  }

  return (
    <>
      <nav className="navbar navbar-expand navbar" >
        <div className="container-fluid d-flex"style={{justifyContent:"flex-start"}} >
        <div className='' style={{ width: "9vh", height: "100%"}}>
          <img src={isAdmin?teacherimg:studentimg} className="" width={'100%'} alt="..." />
        </div>
          <button className='btn fw-bold fs-5'>{localStorage.getItem('username')}</button>
          <button className="btn btn-outline-secondary " style={{marginLeft:"auto"}} onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
