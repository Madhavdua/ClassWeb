import React, { useEffect, useState } from 'react'
import EnrolledgroupItem from './EnrolledgroupItem'

import { useContext } from 'react'
import context from '../Context/createContext'
import AddGroup from './AddGroup';
import CreateGroup from './CreateGroup';

function Enrolledgroups() {
  const c = useContext(context);
  const { fetchgroups, group } = c;
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
      <div>No groups to show</div>
      {!isAdmin && <AddGroup />}
      {isAdmin && <CreateGroup />}

    </div>
  }
  return (
    <>
      {!isAdmin && <AddGroup />}
      {isAdmin && <CreateGroup />}

      {group.length == 0 && <div>No Groups to show</div>}
      {group.length > 0 && <div>
        <div>

        </div>
        <div className='d-flex flex-wrap' style={{ justifyContent: "center" }}>
          {
            group.map((element) => {
              return <div key={element.code}>
                <EnrolledgroupItem group={element} handledeletegroup={handledeletegroup} />
              </div>
            })
          }

        </div>
      </div>}

    </>
  )
}

export default Enrolledgroups