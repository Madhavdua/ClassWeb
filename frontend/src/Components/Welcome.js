import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './style.css'
import './mobile.css'
import Typed from 'react-typed';
import person1 from "../Images/person1.png"
import person2 from "../Images/person2.png"
import person3 from "../Images/person3.png"
import classroom from "../Images/classroom 2.0.png"
const Welcome = () => {
    useEffect(() => {
        localStorage.clear();
    }, [])

    return (
        <>
            <div className='websitename'>
                <img src={classroom} />
                <p>-inspired by Clasroom</p>
            </div>
            <div className='welcome'>
                <div className='person3'>
                    <img src={person3} />
                </div>
                <div className="welcometext">
                    <p className='t1 px-3'>

                        <h1 style={{color:"green", display:"inline"}}>Welcome to the future of education.</h1>
                    </p>
                    <Typed className='t2'
                        strings={[`Ditch the desks,unlock the world.`,
                        `With Classroom: 
                        Elevate Your Learning Journey.`, `Join a network of peers and mentors 
                         who inspire your growth.`,
                         `Same ease, more engagement`, "Let's Get Started."]}
                        typeSpeed={40}
                        backSpeed={60}
                        loop
                    />
                </div>
                <div className='login'>

                    <div className='tlogin'>
                        <img className='person1' src={person1} />
                        < Link to="/adminlogin" > <button className="btn-login ">Admin Login  </button></Link >
                    </div>
                    <div className='slogin'>
                        <img className='person2' src={person2} />
                        < Link to="/login" > <button className="btn-login">Login</button></Link >
                    </div>
                </div>

            </div>
        </>
    )
}

export default Welcome
