import React from 'react'
import './style.css'

function GroupCard() {
  return (
    <>
        <div className=' grp-name-pill my-3'>
          <button>{localStorage.getItem('grp_title')}</button>
          
        </div>
    </>
  )
}

export default GroupCard