import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './style.css'
import './mobile.css'
import logo from '../Images/logo1.jpg'
import leaning from '../Images/leaning boy.png'

const Welcome = () => {
    useEffect(() => {
        localStorage.clear();
    }, [])

    return (
        <>
            {/* <motion.div whileHover={{ width: "fit-content", transition: { duration: .5 } }} className="name">
                © Code by Madhav Dua
            </motion.div> */}
            <div className='welcome'>
                <img className='logo' src={logo} />
                <img className='leaning-img' src={leaning}/>
                <section className='section'>
                    <span className='heading'>Transform Your
                        Class
                        <span className='heading mx-3 text-muted'>
                            Presence
                        </span>
                    </span>
                    <span className='sh1 my-1 '>Smart, Simple, Seamless</span>
                    <Link className='login-link my-4 btn rounded-pill shadow text-decoration-none' to="/adminlogin">Login</Link>
                </section>

            </div>

        </>
    )
}

export default Welcome
