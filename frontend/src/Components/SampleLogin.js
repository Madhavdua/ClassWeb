import React from "react";
import iImg from "../Images/letter-i.png";

function SampleLogin(props) {
  return (
    <>
      <div
        className="offcanvas offcanvas-start text-center"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{ padding: "5%" }}
      >
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          style={{ marginLeft: "90%"}}
        ></button>
        <h4 className="offcanvas-title" id="offcanvasExampleLabel" style={{margin:"10% 0", color:"grey"}}>
          Sample credentials:
        </h4>
        <h5 style={{color:"blue"}}>Name: {props.demoname || "Error loading"}</h5>
        <h5 style={{color:"green"}}>Password: {props.demopass || "Error loading"}</h5>
        <h6 style={{color:"red", marginTop:"100%"}}>*First time login takes time</h6>
      </div>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
        style={{ borderRadius: "50%" }}
      >
        <img
          className=""
          style={{ width: "40px", height: "40px" }}
          src={iImg}
        />
      </button>
    </>
  );
}

export default SampleLogin;
