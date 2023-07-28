import React, { useState } from 'react'
import { useContext } from 'react'
import context from '../Context/createContext'
import './style.css'


function AddGroup() {
   
    const c=useContext(context);
    const [code, setCode] = useState('')
    const handleSubmit=async(e)=>{
        e.preventDefault();
        document.getElementById('closemodal').click();
        // console.log("submit clicked");
        await c.addgroup(code);
    }
    const onChange=(e)=>{
        setCode(e.target.value);
    }
  return (

    <>
            <div>
                <button type="button" className=" toolbox bg-dark btn  text-light position-fixed" style={{ borderRadius: "50%", top: "90%", left: "45%",zIndex:"2" }} data-bs-toggle="modal"  data-bs-target="#addgroup" >
                    +
                    <span className='tooltiptext'>Add Group</span>
                </button>
            </div>
            <div>

                <div className="modal fade" id="addgroup" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog" >
                        <div className="modal-content" style={{backgroundColor:"#9BE8D8", fontWeight:"bold"}}>
                            <div>

                                <form className="container my-3 mx-2" style={{ width: "90%" }}>
                                    <div className="mb-3" >
                                        <label htmlFor="exampleInputEmail1" className="form-label">Enter class code</label>
                                        <input style={{backgroundColor:""}} type="text" className="form-control" placeholder='Enter a valid code' name='code' onChange={onChange} />
                                    </div>
                                   
                                    <div className="modal-footer " style={{justifyContent:"center"}}>
                                        <button id='closemodal' type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button disabled={code.length<6} type="submit" className="btn btn-primary" onClick={(e)=>{

                                            handleSubmit(e)}} >Add Class</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default AddGroup