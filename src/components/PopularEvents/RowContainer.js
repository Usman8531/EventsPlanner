import React from "react";
import { GoLocation } from "react-icons/go";
import { BsCalendarWeek, BsShareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import PreLoader from "components/Preloader/PreLoader";
function RowContainer({ events }) {
  // console.log(events);
  return (
    <>
      {events && events.length > 0 ? (
        <>
          {events.map((event) => (
            <div className="col-lg-4 col-md-6 mb-4" key={event.id}>
              <div className="card shadow border-0">
                <img
                  src={event.imgUrl}
                  className="card-img-top img-fluid"
                  alt={event.event}
                  style={{ height: "40vh" }}
                />
                <div className="card-body">
                  <p className="card-text d-flex justify-content-between">
                    <small className="text-muted fw-semibold">
                      <span className="text-secondary">
                        <BsCalendarWeek className="fs-5 me-2" />
                      </span>
                      {event.date}
                    </small>
                    <small className="text-muted fw-semibold">
                      <span className="text-secondary">
                        <GoLocation className="fs-5 me-2" />
                      </span>
                      {event.location}
                    </small>
                  </p>
                  <h5 className="card-title">{event.event}</h5>
                  <p className="card-text">{event.description}</p>
                  <p className="card-text">Participants: {event.participants}</p>
                  <div className="d-flex justify-content-between">
                    <Link
                      className="text-secondary fw-bolder"
                      to={`buyNow/${event.id}`}
                    >
                      Book Now
                    </Link>
                    <p className="text-secondary fw-bolder">
                      <BsShareFill className="fs-4" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <PreLoader />
      )}
    </>
  );
}

export default RowContainer;
