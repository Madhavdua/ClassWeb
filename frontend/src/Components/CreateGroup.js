import React, { useState } from 'react'
import { useContext } from 'react'
import context from '../Context/createContext'
function CreateGroup() {

    const c = useContext(context);
    const [Cred, setCred] = useState({
        title: '',
        description: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        document.getElementById('closemodal').click();
        // console.log("submit clicked");
        await c.creategroup(Cred.title, Cred.description);
        c.fetchgroups();
    }
    const onChange = (e) => {
        setCred({ ...Cred, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div>
                <button type="button" className="btn bg-dark toolbox text-light position-fixed" style={{ borderRadius: "50%", top: "90%", left: "45%", zIndex: "2" }} data-bs-toggle="modal" data-bs-target="#creategroup">
                    +
                    <span className='tooltiptext'>Create group</span>
                </button>
            </div>
            <div className="modal fade" id="creategroup" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{backgroundColor:"#87b1f5", fontWeight:"bold"}}>
                        <div>

                            <form className="container my-3 mx-2" style={{ width: "90%" }}>
                                <div className="mb-3" >
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input style={{ backgroundColor: "" }} type="text" className="form-control" placeholder='Enter a title of atleast 3 charachter' name='title' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label" >Description</label>
                                    <input style={{ backgroundColor: "" }} type="text" className="form-control" name='description' placeholder='Enter a description of atleast 5 charachter' onChange={onChange} />
                                </div>


                                <div className="modal-footer " style={{ justifyContent: "center" }}>
                                    <button id='closemodal' type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button disabled={Cred.title.length < 3} type="submit" className="btn bg-light text-dark" onClick={(e) => {

                                        handleSubmit(e)
                                    }} >Add Group</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateGroup

