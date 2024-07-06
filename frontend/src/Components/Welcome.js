import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './style.css'
import './mobile.css'
import { motion } from 'framer-motion';
import bg_vid from '../Images/bg-vid.mp4'
import bg_vid_mobile from '../Images/bg_vid_mobile.mp4'
import ReactTyped from 'react-typed';

const Welcome = () => {
    useEffect(() => {
        localStorage.clear();
        document.getElementById('bg-video').play();
    }, [])

    const heading = "C l a s s r o o m 2.0 ".split(" ");
    const subhead = "Engage Students, Empowers Teachers";

    return (
        <>
        <div style={{ width:"100vw", height:"100vh",overflow:"hidden"}}>
            <motion.div whileHover={{ width: "fit-content", transition: { duration: .5 } }} className="name">
                © Code by Madhav Dua
            </motion.div>
            <video muted loop id="bg-video">
                <source src={window.innerWidth>750?bg_vid:bg_vid_mobile} type="video/mp4" />
            </video>
            <div className='welcome'>
                <div className='nav ' style={{ width: "100vw" }}>
                    <div className='login-text'>Sign in as:</div>
                    <div className='goto'>
                        <Link className='btn goto-link' to='/adminlogin'>Teacher</Link>
                        <Link className='btn goto-link' to='/login'>Student</Link>
                    </div>
                </div>

                <div className="welcome-text">
                    <div className='welcome-head'>
                        {heading.map((el, i) => (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.25,
                                    delay: i / 10,
                                }}
                                key={i}
                            >
                                {el}
                            </motion.span>
                        ))}

                    </div>
                    <ReactTyped className='subhead'
                        strings={[
                            "Engage Students, Empower Teachers",
                            "Increased Efficiency for Teachers",
                            "Effortless Management",
                            "Improved Learning Engagement",
                        ]}
                        typeSpeed={30}
                        backSpeed={60}
                        loop
                    />
                </div>

            </div>

        </div>
        </>
    )
}

export default Welcome
