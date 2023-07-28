import React,{ useContext } from 'react';
import context from '../Context/createContext';

import LoadingBar from 'react-top-loading-bar'

function Bar() {
    const c=useContext(context);
  return (
    <>
    <LoadingBar
        color='red'
        progress={c.progress}
        />
    </>
  )
}

export default Bar