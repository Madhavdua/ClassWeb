import React from 'react'
import { useContext } from 'react'
import context from '../Context/createContext'
const Alert = (props) => {
  const c = useContext(context);
  return (
    <>
      {c.alert && <div className="alert alert-primary position-absolute " role="alert" style={{left:"40%"}}>
        {c.msg}
      </div>}

    </>
  )
}

export default Alert