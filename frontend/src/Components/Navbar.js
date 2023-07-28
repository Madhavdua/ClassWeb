import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import context from '../Context/createContext'
import classroom from '../Images/classroom.png'

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/')
    localStorage.clear();
  }

  return (
    <>
      <nav className="navbar navbar-expand navbar" >
        <div className="container-fluid d-flex"style={{justifyContent:"flex-start"}} >
        <div className='' style={{ width: "9vh", height: "100%"}}>
          <img src={classroom} className="" width={'100%'} alt="..." />
        </div>
          <button className='btn fw-bold fs-5'>{localStorage.getItem('username')}</button>
          <button className="btn btn-outline-secondary " style={{marginLeft:"auto"}} onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
