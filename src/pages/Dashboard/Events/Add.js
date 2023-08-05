import React from "react";
import AddForm from "./AddForm";
export default function Add() {
  // ////////////////    ////////////////////////

  return (
    <>
      <main>
        <div className="container-md-fluid border-0">
          <div className="row">
            <div className="col-12">
              <div className="  d-flex justify-content-center align-items-center">
                <h3 className="text-center text-secondary fw-bolder fs-2 text-uppercase">
                  Add Event
                </h3>
              </div>
              <div className="offset-lg-2 offset-md-2 col-lg-8 col-md-8 col-12 card border-0 shadow-sm py-2 px-3">
                <AddForm flag={true} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
