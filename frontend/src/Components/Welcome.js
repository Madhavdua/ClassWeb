import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './style.css'
import './mobile.css'
import logo from '../Images/logo1.jpg'
import gif1 from '../Images/gif1.gif'

const Welcome = () => {
    useEffect(() => {
        localStorage.clear();
    }, [])

    return (
        <>
            {/* <motion.div whileHover={{ width: "fit-content", transition: { duration: .5 } }} className="name">
                © Code by Madhav Dua
                </motion.div> */}
            <img className='bggif1' src={gif1}/>
            <div className='welcome'>
                <img className='logo' src={logo} />
                <section className='section'>
                    <span className='heading'>Transform Your Class
                        <span className='heading mx-3 text-muted'>
                            Presence
                        </span>
                    </span>
                    <span className='sh1 my-2'>Smart, Simple, Seamless</span>
                    <Link className='login-link my-4 btn rounded-pill shadow text-decoration-none' to="/login">Login</Link>
                </section>

            </div>

        </>
    )
}

export default Welcome
