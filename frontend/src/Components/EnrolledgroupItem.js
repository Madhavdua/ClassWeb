import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
// import bgImg from '../Images/grp-name.jpg'   
import './style.css'
import context from '../Context/createContext';
function EnrolledgroupItem(props) {
    const c = useContext(context);
    const { group } = props;
    const isAdmin = localStorage.getItem('isAdmin') == 'true';
    const {handledeletegroup}=props;
    return (
        <>

            <div className="card mx-3 my-2 " style={{ minWidth: "320px", width: "max-content", borderRadius: "6%" }}>
                <div className="card-body grp-item-img " style={{ borderTopLeftRadius: "6%", borderTopRightRadius: "6%" }}>
                    <h5 className="card-title fs-3">{group.title}</h5>

                    {/* <p className="card-text">Code : {group.code}</p> */}
                    <p className="card-text fs-5">{group.description}</p>
                    <div className='code-square '>
                        <div className='code d-flex'>
                            {group.code}

                        </div>
                    </div>
                </div>
                <div className='card-body py-2 px-3 border-top border-1 border-secondary ' style={{ marginTop: "6vh" }}>
                    <div className='d-flex' style={{ justifyContent: "space-between" }}>
                        <div>

                            <Link className='btn view-task-link' to="/dashboard/task" onClick={async () => {
                                localStorage.setItem('code', group.code)
                                localStorage.setItem('grp_title', group.title)
                            }}>View task</Link>
                        </div>
                        <div>
                            <button type="button" className="btn delete-grp-link" onClick={()=>handledeletegroup(group.code)}>
                                <i className="fa-sharp fa-solid fa-trash"></i>
                            </button>


                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default EnrolledgroupItem;