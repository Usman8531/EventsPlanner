import React from "react";
import { TbBuildingBroadcastTower, TbChairDirector } from "react-icons/tb";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BsCalendarWeek } from "react-icons/bs";
function InnerData() {
  return (
    <>
      <div className="col-lg-5 col-md-12">
        <div className="d-flex justify-content-start align-items-start flex-column">
          <p className="text-secondary">
            <BsCalendarWeek className="me-2 text-dark" />
            january 21,2021
          </p>
          <h1 className="text-uppercase text-start fw-bold display-2 text-dark text-opacity-75">
            Events,Meeting & <span className="text-secondary">Conferences</span>
          </h1>
        </div>
        <div className="d-flex justify-content-evenly mt-3 flex-wrap">
          <p className="text-dark fw-light">
            <TbChairDirector className="text-secondary " />
            <span className="fw-bold">500 </span>
            seats
          </p>
          <p className="text-dark fw-light">
            <HiOutlineSpeakerphone className="text-secondary" />
            <span className="fw-bold">10 </span>
            Speakers
          </p>
          <p className="text-dark fw-lighter">
            <TbBuildingBroadcastTower className="text-secondary " />
            <span className="fw-bold">1352, </span>
            broadway
          </p>
        </div>
        <div className="">
          <button type="button" className="btn btn-secondary mx-3 custom-btn">
            Book Now
          </button>
          <button type="button" className="btn btn-outline-secondary px-3">
            View Details
          </button>
        </div>
      </div>
      <div className="col-lg-5 col-md-12 my-md-5">
        <img
          src="https://eventlab-react.b-cdn.net/static/media/hero-figure1.bab7ce80.png"
          className="d-block img-fluid"
          alt="..."
        />
      </div>
    </>
  );
}

export default InnerData;
