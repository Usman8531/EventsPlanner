import React from "react";

function CardForm() {
  return (
    <>
      <div className="container heroSection-card card py-lg-4 py-md-3">
        <div className="row form-row align-items-center">
          <div className="col-lg-3 col-md-12">
            <input
              type="text"
              className="form-control border-secondary rounded-pill"
              placeholder="Event Location..."
            />
          </div>
          <div className="col-lg-3 col-md-12 mt-2">
            <input
              type="date"
              className="form-control border-secondary rounded-pill"
              placeholder="Event Location..."
            />
          </div>
          <div className="col-lg-3 col-md-12 my-2">
            <select
              className="form-select border-secondary rounded-pill form-control"
              aria-label="Default select example"
            >
              <option value={"Category"}>Category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-lg-2 col-md-12 mt-2">
            <button className="btn btn-secondary form-control border-secondary rounded-pill">
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardForm;
