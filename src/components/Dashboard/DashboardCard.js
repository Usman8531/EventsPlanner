import React from "react";
// import { TbDeviceAnalytics } from "react-icons/tb";

function DashboardCard({ text3, text1, text2, Icon }) {
  return (
    <div className="col-12 col-lg-4 my-2 my-lg-0">
      <div className="card border-0 shadow-lg">
        <div className="card-body d-flex justify-content-around align-items-center p-4" style={{ height: 280 }}>
          <div>
            <p className="fw-light fs-5">{text1}</p>
            <p className="fw-bold fs-3">{text2}</p>
            <p className="fw-light fs-5 mb-0">{text3}</p>
          </div>
          <div className="d-flex">
            <Icon className="fs-3 fw-bolder text-secondary" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardCard;
