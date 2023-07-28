import React, { useState ,useEffect,useContext} from 'react'
import todoimg from '../Images/todoimg.png'
import context from '../Context/createContext';
import './style.css'

function TaskItem(props) {
    const c=useContext(context);
    const server=process.env.server||"http://127.0.0.1";
    const { task } = props;
    const sample_date = task.assigned_date;
    let finalTime, currTime;
    const dateObj = new Date(sample_date);
    const final_date = dateObj.toDateString().slice(0, -4);
    const [days_left, setdays_left] = useState();
    useEffect(() => {
        finalTime = dateObj.getTime();
        currTime = new Date().getTime();

        const diff = Math.floor((finalTime - currTime) / (1000 * 60 * 60 * 24))+1;
        setdays_left(diff);
    }, [])

    const showattachment=async()=>{
        const res=await c.showattachment(task._id);
        if(res===true){
            
            window.open(`${server}/attachment/`,'_blank');
        }
    }
    const deletetask=async()=>{
        const res=await c.deletetask(task._id);
        if(res){
            c.fetchtasks(localStorage.getItem('code'));
        }
    }

    let status = false;


    return (
        <>
            <div className='card taskitem-card toolbox my-1' style={{ width: "95vw", height: "100%" }}>
                <span className='tooltiptext'>{task.description}</span>
                <div className='content border-top border-primary border-3 d-flex p-2' style={{ alignItems: "center" }}>

                    <div className='mx-2' style={{ width: "9vh", height: "100%" }}>
                        <img src={todoimg} className="" width={'100%'} alt="..." />
                    </div>
                    <div className='d-flex flex-column' style={{ marginLeft: "15px" }}>

                        <div className='fw-bold fs-4'>
                            {task.title}
                        </div>
                        <div className='d-flex ' style={{ width: "100%" }}>
                            <div>
                                <p>{final_date}</p>
                            </div>
                            <div className='mx-2'>
                                <p>({Math.abs(days_left)}days {days_left >= 0 ? 'remaining' : 'late'}) </p>
                            </div>
                        </div>

                    </div>
                    <div className='' style={{marginLeft:"auto"}}>
                            {/* <button type="submit" className="btn btn-outline-primary border-2 py-1 mx-3 my-0" style={{ marginLeft: "auto" }} onClick={() => { c.setWorkform(true) }}>
                                submit
                            </button> */}
                        {localStorage.getItem('isAdmin') === "false" && <div>

                            { task.file.length>1?<button className='btn btn-outline-primary' onClick={showattachment}>View attachment</button>:<button className='border-0 bg-light'>No attachment</button>}
                        </div>}
                        {localStorage.getItem('isAdmin') === "true" && <div>
                            <button className='btn' onClick={deletetask}> <i className="fa-sharp fa-solid fa-trash"></i></button>
                        </div>}
                    </div>

                </div>

            </div>
        </>
    )
}

export default TaskItem


    // {localStorage.getItem('isAdmin') === "false" && <div>

    //     <button type="button" className="btn btn-outline-primary border-2 py-1 mx-3 my-0" style={{ marginLeft: "auto" }} onClick={() => { console.log("call for submit task") }}>
    //         submit
    //     </button>
    // </div>}



// {localStorage.getItem('isAdmin') === 'true' && <div className="dropdown my-3 " >
//                         <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                             Users
//                         </a>
//                         <ul className="dropdown-menu">

//                             {/* userlist here */}
//                             <li>i am user list</li>
//                         </ul>
//                     </div>}