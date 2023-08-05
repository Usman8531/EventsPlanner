import React from "react";
import EventList from "./EventList";

function PopularEvents() {
  return (
    <>
      <section id="events">
        <div className="container py-3">
          <div className="row">
            <div className="col">
              <h2 className="text-uppercase text-center fw-bold display-4">
                Popular Events
              </h2>
            </div>
            <EventList />
          </div>
        </div>
      </section>
    </>
  );
}

export default PopularEvents;
