import React from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import InnerData from "./InnerData";
import { useAuthContext } from "contexts/AuthContext";
import PreLoader from "components/Preloader/PreLoader";
function RecentEvents() {
  const { details } = useAuthContext();
  // console.log(details);
  return (
    <>
      <section id="about">
        <div className="container py-5">
          <div className="row">
            <div className="col">
              <h2 className="text-uppercase text-center fw-bold display-5">
                RECENT EVENT SCHEDULE
              </h2>
              <div className="d-flex justify-content-between">
                <div className="">
                  <button
                    className="btn btn-sm "
                    type="button"
                    data-bs-target="#recentCarousel"
                    data-bs-slide="prev"
                  >
                    <BsArrowLeftCircle className="fs-1 text-secondary" />
                  </button>
                </div>
                <div className="">
                  <button
                    data-bs-slide="next"
                    className="btn btn-sm "
                    type="button"
                    data-bs-target="#recentCarousel"
                  >
                    <BsArrowRightCircle className="fs-1 text-secondary" />
                  </button>
                </div>
              </div>
              <div
                id="recentCarousel"
                className="carousel slide py-5"
                data-bs-touch="false"
              >
                <div className="carousel-inner">
                  {details ? (
                    <InnerData recentEvents={details} />
                  ) : (
                    <PreLoader />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RecentEvents;
