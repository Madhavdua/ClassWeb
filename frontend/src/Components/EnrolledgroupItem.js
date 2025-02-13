import React, { useContext, useState, useEffect } from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import context from '../Context/createContext';
function EnrolledgroupItem(props) {
    const c = useContext(context);
    const { group } = props;
    const [isAdmin, setisAdmin] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("isAdmin") == true) {
            setisAdmin(true);
        }
    }, [])
    
    const { handledeletegroup } = props;
    return (
        <>
            <div className="grp-item-card m-2 card p-3 shadow border border-3" >
                <div className='d-flex justify-content-between'>
                <div className='code-pill rounded p-2'>
                    {group.code}
                </div>
                <button type="button" className="delete-grp-item" onClick={() => handledeletegroup(group.code)}>
                    <i className="fa-sharp fa-solid fa-trash"></i>
                </button>
                    
                </div>
                <div className='my-2'>
                    <p className="grp-item-title">{group.title}</p>
                    <p className="grp-item-desp text-muted">{group.description}</p>
                </div>
                <Link className='view-tasks p-2 rounded fw-bold' to="/dashboard/task" onClick={async () => {
                    localStorage.setItem('code', group.code)
                    localStorage.setItem('grp_title', group.title)
                }}>
                    View Tasks
                   {/* <i class="fa-duotone fa-solid fa-file-pen"></i> */}
                </Link>
            </div>

        </>
    )
}

export default EnrolledgroupItem;