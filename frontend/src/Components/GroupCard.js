import React from 'react'
import bgImg from '../Images/grp-name.jpg'
import './style.css'

function GroupCard() {
  return (
    <>
        {/* <img src={bgImg} className="" width={'100%'} height={'100%'} alt="..." style={{objectFit:"cover"}} /> */}
        <div className=' grp-name-pill my-3'>
          <button>{localStorage.getItem('grp_title')}</button>
          
        </div>
        {/* <div className='grp-card grp-card-name '>
          {localStorage.getItem('username')}
        </div> */}
    </>
  )
}

export default GroupCard