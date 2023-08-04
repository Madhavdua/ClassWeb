import React from 'react'
import { useContext, useEffect } from 'react';
import TaskItem from './TaskItem';
import AssignTask from './AssignTask'
import context from '../Context/createContext';
import GroupCard from './GroupCard';
import Nothing from './Nothing';


const Task = (props) => {
    const c = useContext(context);
    useEffect(() => {
        c.fetchtasks(localStorage.getItem('code'));
    }, [])


    const tasks = c.tasks;
    // const tasks = [
    //     {
    //         title: "1s t bdf",
    //         description: "1s t bdf",
    //         assigned_date: "2003-10-1",
    //         grp_name: "It-2nd yr",
    //     },
    //     {
    //         title: "2s t bdf",
    //         description: "2s t bdf",
    //         assigned_date: "2003-10-1",
    //         grp_name: "It-2nd yr",
    //     },
    //     {
    //         title: "3s t bdf",
    //         description: "3s t bdf",
    //         assigned_date: "2003-10-1",
    //         grp_name: "It-2nd yr",
    //     },
    // ]


    return (
        <>
            <div className='d-flex flex-column'>


                {tasks && tasks.length>0 && <div style={{ height: "100%" }}>

                    <GroupCard />

                </div>}
                <div>

                    {(!tasks || tasks.length === 0) && <div className='container'><Nothing parent={"tasks"} admin={localStorage.getItem('isAdmin')=='true'}/></div>}

                    {(tasks && tasks.length >= 1) && <div className=''>

                        {/* <h3 className='text-center'>Assigned task(s) are shown:</h3> */}



                        <div className='d-flex flex-wrap' style={{ alignItems: "center", justifyContent: "center" }}>

                            {tasks.length > 0 && tasks.map((element) => {
                                return <div key={tasks.indexOf(element)} className="d-flex flex-wrap" style={{ width: "auto" }}> <TaskItem task={element} /></div>
                            })}
                        </div>

                    </div>}
                    {localStorage.getItem('isAdmin') == 'true' && <AssignTask />}
                </div>

            </div>

        </>
    )
}

export default Task