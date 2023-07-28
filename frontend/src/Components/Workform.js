import React from 'react'
import { useContext ,useState} from 'react'
import context from '../Context/createContext'
import './style.css'
function Workform() {
    const c = useContext(context);

const [filedata, setfiledata] = useState();

    const submitform=async(e)=>{
        e.preventDefault();
        if(filedata){
        await c.fileupload(filedata);
        }
        else {
            c.setMsg('Kindly choose file to submit')
        }
        setfiledata();
        c.setWorkform(false);
    }

    return (
        <>
            {c.workform &&
            <div className=''>
                <div className='completeform'>

                </div>
                <div className='workform'>
                    <div className='closeform py-1 px-4'>
                        <button className='btn' onClick={()=>{setfiledata();c.setWorkform(false)}}>
                            X
                        </button>
                        
                        </div>

                    <div className='workform-form'>
                        <form action='' onSubmit={(e)=>{submitform(e)}}>
                            <div className='d-flex flex-column '>

                                <label className='my-1 btn' htmlFor="exampleInputEmail1" >Submit work</label>
                                <input className='my-2 d-flex flex-wrap p-1' type="file" style={{width:"max-content"}}  onChange={(e)=>{setfiledata(e.target.files[0])}} />
                                <button  type="submit" style={{width:"100px", marginLeft:"auto",marginRight:"auto"}} className=" my-3 btn btn-outline-success ">Submit</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>

            }
        </>
    )
}

export default Workform