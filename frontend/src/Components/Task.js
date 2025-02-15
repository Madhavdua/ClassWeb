import React from 'react'
import { useContext, useEffect ,useState} from 'react';
import TaskItem from './TaskItem';
import AssignTask from './AssignTask'
import context from '../Context/createContext';
import GroupCard from './GroupCard';
import Nothing from './Nothing';


const Task = () => {
    const c = useContext(context);
    const [isAdmin, setisAdmin] = useState(false);

    useEffect(() => {
        setisAdmin(localStorage.getItem('isAdmin')==="true");
        c.fetchtasks(localStorage.getItem('code'));
    }, [])


    const tasks = c.tasks;

    return (
        <>
            <div className='d-flex flex-column'>

                {tasks && tasks.length>0 && 
                <div style={{ height: "100%" }}>

                    <GroupCard />

                </div>}
                <div>

                    {(!tasks || tasks.length === 0) && <div className='container'><Nothing parent={"tasks"} admin={isAdmin}/></div>}

                    {(tasks && tasks.length >= 1) && 
                    
                        <div className='d-flex flex-wrap flex-column' style={{ alignItems: "center", justifyContent: "center" }}>

                            {tasks.map((element) => {
                                return <div key={element.title}>

                                    <TaskItem task={element} />
                                </div>
                                
                            })}
                        </div>


                    }
                    {isAdmin && <AssignTask />}
                </div>

            </div>

        </>
    )
}

export default Task