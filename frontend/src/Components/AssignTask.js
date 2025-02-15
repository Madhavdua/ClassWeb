import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import context from '../Context/createContext'
function AssignTask() {
    const c=useContext(context);
    const today=new Date().toISOString().slice(0,10);
    

    const [cred, setCred] = useState({
        title: "",
        description: "",
        assigned_date: "",
        file:null
    })
    const [allowedFilesize,setallowedFilesize]=useState(1);
    const[size,setSize]=useState(0);
    const onChange = (e) => {
        // console.log(cred)
        if(e.target.name=='file'){
            setCred({ ...cred, ['file']: e.target.files[0]});
            if(e.target.files[0])
            {let filesize=(e.target.files[0].size/(1000000));
            setSize(filesize);}
            // console.log(size)}
            else {
                setSize(0);
            }
        }
        else{
            setCred({ ...cred, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        await c.addtask(cred);
        setCred({
            title: "",
            description: "",
            assigned_date: "",
            file:null
        })
        c.fetchtasks(localStorage.getItem('code'));

        document.getElementById('closemodal').click();
    }


    return (
        <>
            <div>
                <button type="button" className="add-btn btn bg-dark toolbox text-light position-fixed"data-bs-toggle="modal" data-bs-target="#assigntask">
                    +
                    <span className='tooltiptext'>Assign new task</span>
                </button>
            </div>
            <div>

                <div className="modal fade " id="assigntask" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog " >
                        <div className="modal-content" >
                                <form className="assign-task-form p-2 my-3 mx-2 shadow">
                                    <div className="mb-3" >
                                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                        <input type="text" className="form-control" placeholder='Enter a title of atleast 5 charachter' name='title' onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label" >Description</label>
                                        <input  type="text" className="form-control" name='description' placeholder='Enter a description' onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label" >Assign Date</label>
                                        <input  type="date" defaultValue={today} className="form-control" name='assigned_date' placeholder='Select due date' onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" >Attach file {size>allowedFilesize?`max allowed size:${allowedFilesize}mb`:''}</label>
                                        <input  type="file" className={`${size>allowedFilesize?'border-2 border-danger':''}  form-control` }accept='application/pdf,image/*' name='file' placeholder='Select due date' onChange={onChange} />
                                    </div>

                                    <div className="modal-footer " >
                                        <button id='closemodal' type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button disabled={cred.title.length < 5 || size>allowedFilesize} type="submit" className="btn bg-light text dark" onClick={handleSubmit} >Assign</button>
                                    </div>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AssignTask