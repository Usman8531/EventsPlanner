import { useAuthContext } from "contexts/AuthContext";
import React from "react";
import DetailEventTable from "./DetailEventTable";

function AllRecentEvents() {
  const { details } = useAuthContext();
  // console.log(details);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <h3 className="text-secondary fw-semibold">Recent Event details</h3>
          </div>
          <DetailEventTable data={details} />
        </div>
      </div>
    </>
  );
}

export default AllRecentEvents;
