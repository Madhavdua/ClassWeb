import React from 'react'
import nothing from '../Images/nothing.webp'
import './style.css'
function Nothing(props) {
    return (
        <>
            <div className='nothing' >
                <div className='one d-flex flex-wrap' style={{ justifyContent: "center", alignItems: "center" }}>

                    <img src={nothing} width={"90vw"} />

                    <div className='fw-bold'>
                        No {props.parent} found
                    </div>
                </div>
                {
                    props.admin && <div className='add-new fw-bold '>Kindly add new {props.parent}</div>
                }
            </div>
        </>
    )
}
Nothing.defaultProps = {
    admin: true,
    parent:"thing"
}

export default Nothing