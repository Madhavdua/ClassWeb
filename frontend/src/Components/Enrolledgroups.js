import React, { useEffect, useState } from 'react'
import EnrolledgroupItem from './EnrolledgroupItem'

import { useContext } from 'react'
import context from '../Context/createContext'
import AddGroup from './AddGroup';
import CreateGroup from './CreateGroup';
import Nothing from './Nothing';

function Enrolledgroups() {
  const c = useContext(context);
  const { fetchgroups} = c;
  const group=c.group;
  const [isAdmin, setisAdmin] = useState(localStorage.getItem('isAdmin') == 'true');
  useEffect(() => {
    fetchgroups();
  }, [])

  const handledeletegroup = async (code) => {
    const w = window.confirm("Proceeding further will delete the group");
    if (!w) return;
    if (isAdmin) {
      await c.deletegroup(code);
    }
    else {
      const req = await c.removegroup(code);
    }
  }
  if(!group || group.length==0){
    return <div>
      <div><Nothing parent={"groups"}/></div>
      {!isAdmin && <AddGroup />}
      {isAdmin && <CreateGroup />}

    </div>
  }
  return (
    <>
      {!isAdmin && <AddGroup />}
      {isAdmin && <CreateGroup />}

      {group.length == 0 && <div><Nothing parent={"groups"}/></div>}
      {(group && group.length > 0) && 
        <div className='d-flex flex-wrap' style={{ justifyContent: "center" }}>
          {
            group.length>0 && group.map((element) => {
              return <div key={group.indexOf(element)}>
                <EnrolledgroupItem group={element} handledeletegroup={handledeletegroup} />
              </div>
            })
          }

        </div>}

    </>
  )
}

export default Enrolledgroups