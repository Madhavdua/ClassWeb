import React, { useState, useEffect, useContext } from 'react'
import todoimg from '../Images/todoimg.png'
import context from '../Context/createContext';
import './style.css'
function TaskItem(props) {
    const c = useContext(context);
    const server = process.env.REACT_APP_BASE_URL || "http://127.0.0.1";
    const { task } = props;
    const sample_date = task.assigned_date;
    let finalTime, currTime;
    const dateObj = new Date(sample_date);
    const final_date = dateObj.toDateString().slice(0, -4);
    const [days_left, setdays_left] = useState();
    useEffect(() => {
        finalTime = dateObj.getTime();
        currTime = new Date().getTime();

        const diff = Math.floor((finalTime - currTime) / (1000 * 60 * 60 * 24)) + 1;
        setdays_left(diff);
    }, [])

    const showattachment = async () => {
        const res = await c.showattachment(task._id);
        if (res === true) {

            window.open(`${server}/attachment/`, '_blank');
        }
    }
    const deletetask = async () => {
        const res = await c.deletetask(task._id);
        if (res) {
            c.fetchtasks(localStorage.getItem('code'));
        }
    }

    let status = false;


    return (
        <>
            <div className='border-top border-primary border-3 my-2 p-2 taskitem-card my-1'>

                    <img src={todoimg} className="todoimg" width={'100%'} alt="..." />
                    <div className='d-flex flex-column'>

                        <div className=' fs-4'>
                            {task.title}
                        </div>
                        <div className='d-flex ' >
                            <div>
                                <p>{final_date}</p>
                            </div>
                            <div className='mx-2'>
                                <p>({Math.abs(days_left)}days {days_left >= 0 ? 'remaining' : 'late'}) </p>
                            </div>
                        </div>

                    </div>
                    <div className='' >
                        {localStorage.getItem('isAdmin') === "false" ? <div>

                            {task.file.length > 1 ? <button className='btn btn-outline-secondary'><a href={task.file} target='_blank'>View attachment</a></button> : <button className='border-0 bg-light'>No attachment</button>}
                        </div> : <div>
                            <button className='btn' onClick={deletetask}> <i className="fa-sharp fa-solid fa-trash"></i></button>
                        </div>}
                    </div>

            </div>
        </>
    )
}

export default TaskItem

