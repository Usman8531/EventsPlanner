import React, { useState } from "react";
import { AiOutlinePicRight } from "react-icons/ai";
import { TbSpeakerphone } from "react-icons/tb";
import { BsCalendarWeek } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { TbChairDirector } from "react-icons/tb";
import { HiOutlineSparkles } from "react-icons/hi";
import { Rate } from "antd";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
function ProductImg({ data }) {
  const [value, setValue] = useState(0);
  // console.log(data);
  return (
    <>
      {data && (
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <img
                src={data.imgUrl}
                alt={data.event}
                className="img-fluid w-100 object-fit-cover rounded-4"
              />
            </div>
          </div>
          <div className="col d-flex justify-content-between mt-3 flex-wrap align-items-center">
            <p className="text-secondary">
              <span>
                {" "}
                <BsCalendarWeek className="fs-5 me-2 text-dark" />
              </span>{" "}
              {data.date}
            </p>
            <p className="text-dark fw-light">
              <TbChairDirector className="text-secondary " />
              <span className="fw-bold"> 500 </span>
              seats
            </p>
            <p className="text-dark fw-lighter">
              <GoLocation className="text-secondary " />
              <span className="fw-bold"> {data.location} </span>
            </p>
          </div>
          <hr />
          <div className="row">
            <div className="col d-flex justify-content-between flex-wrap align-items-center">
              <p className="text-dark fw-light">
                <AiOutlinePicRight className="text-secondary " />
                <span className="fw-bold mx-3">
                  Event Type
                  <span className="d-block text-capitalize fw-light">
                    {data.category}
                  </span>
                </span>
              </p>
              <p className="text-dark fw-light">
                <TbSpeakerphone className="text-secondary " />
                <span className="fw-bold mx-3">
                  Speakers
                  <span className="d-block text-capitalize fw-light">
                    10 speaker
                  </span>
                </span>
              </p>
              <p className="text-dark fw-light">
                <HiOutlineSparkles className="text-secondary " />
                <span className="fw-bold mx-3">
                  Sponsor
                  <span className="d-block text-capitalize fw-light">
                    eventLab
                  </span>
                </span>
              </p>
              <p className="text-dark fw-lighter">
                <span>
                  <Rate tooltips={desc} onChange={setValue} value={value} />
                  <br />
                  {value ? (
                    <span className="ant-rate-text">{desc[value - 1]}</span>
                  ) : (
                    ""
                  )}
                </span>
              </p>
            </div>
            <hr className=" opacity-25" />
          </div>
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="fw-bold fs-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, accusantium?
            </div>
          </div>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nemo dolore
        esse, facilis sit vel odit unde eius quibusdam, quidem nihil vero eos
        sunt! Asperiores eveniet sit consequuntur laborum corrupti!
      </p>
    </>
  );
}

export default ProductImg;
