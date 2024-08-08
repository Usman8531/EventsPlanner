import React from 'react'

import NotFound from "../../assets/Img/NotFound.svg";
function PreLoader() {
  return (
    <>
        <div className="container d-flex justify-content-center align-items-center">
          <div className="row">
            <div className="col">
              <img
                src={NotFound}
                className="img-fluid"
                style={{ height: "30vh" }}
                alt=""
              />
              <p className="text-center mt-3">"No Event Found"</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default PreLoader