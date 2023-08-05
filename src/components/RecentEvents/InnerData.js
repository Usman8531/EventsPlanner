import React from "react";
import PreLoader from "components/Preloader/PreLoader";

function InnerData({ recentEvents }) {
  return (
    <>
      {recentEvents && recentEvents.length > 0 ? (
        <>
          {recentEvents.map((event, i) => (
            <div
              className={`carousel-item ${i === 0 ? "active" : ""}`}
              key={i + 1}
            >
              <div className="container">
                <div className="row">
                  <div className="col">
                    {[event.firstInstructor, event.secondInstructor, event.thirdInstructor, event.fourthInstructor].map((instructor, j) => (
                      <div className="row my-3" key={j}>
                        <div className="col-lg-5 col-12 ms-0 ps-0 bg-secondary text-white">
                          <p className="fs-3 fw-bold text-center py-3">
                            {instructor.time} PM
                          </p>
                          <p className="fs-5 fw-bold text-center">
                            Room No - {instructor.room}
                          </p>
                          <div className="d-flex justify-content-around">
                            <div className="img-container">
                              <img
                                src={instructor.imgUrl}
                                className="img-card--recentEvents img-fluid"
                                alt=""
                              />
                            </div>
                            <div className="">
                              <p className="fs-2 fw-bold text-center display-3">
                                {instructor.name}
                              </p>
                              <p className="fs-5 fw-bold text-center display-3">
                                Teaches - {instructor.instructor}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-7 col-12 border border-secondary">
                          <div className="">
                            <p className="text-bold fs-4">{instructor.desc}</p>
                            <p className="text-lighter">{instructor.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default InnerData;
