import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mx-auto text-center">
          <h1 className="display-4">404</h1>
          <p className="lead">Page Not Found</p>
          <p>Oops! The page you are looking for does not exist.</p>
          <Link to={"/"} className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoPage;
