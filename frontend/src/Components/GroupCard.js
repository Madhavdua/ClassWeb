import React from 'react'
import bgImg from '../Images/grp-name.jpg'
import './style.css'

function GroupCard() {
  return (
    <>
      <div className='mx-2 my-2 card-head-box ' style={{ position: "relative", width: "auto", maxWidth: "99vw" }}>
        <img src={bgImg} className="" width={'100%'} height={'100%'} alt="..." style={{objectFit:"cover"}} />
        <div className='grp-card grp-card-title my-3'>
          {localStorage.getItem('grp_title')}
        </div>
        <div className='grp-card grp-card-name '>
          {localStorage.getItem('username')}
        </div>
      </div>
    </>
  )
}

export default GroupCard