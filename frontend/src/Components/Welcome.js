import React,{useEffect} from 'react'
import { Link } from 'react-router-dom';
import './style.css'
import tasker from "../Images/tasker.avif"
const Welcome = () => {
    useEffect(() => {
      localStorage.clear();
    }, [])
    
    return (
        <>
            <div className='d-flex bg-dark'>
                <div className='left' style={{ width: "49vw", objectFit: "cover", height: "100vh" }}>
                    <img src={tasker} height={"100%"} alt='...' width={"100%"} />
                </div>
                <div className='right d-flex flex-column'>
                    <div className='admin'>
                    <Link to="/adminlogin"><button className="btn btn-outline-secondary mx-3">Admin Login</button></Link> 
                    </div>
                    <div className='head '> Your Time</div>
                    <div className='head'> Your Goals</div>
                    <div className='head'> You are the boss</div>
                    <div className='content'>
                        <p>Let our services take your productivity to the next level. </p>
                    </div>
                    <div className='login' >
                    < Link to = "/login" > <button className="btn btn-outline-primary mx-3">Login  &rarr;</button></Link >
                    </div>
                </div>
            </div>
        </>
    )
}

export default Welcome
