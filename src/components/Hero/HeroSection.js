import React from "react";
import { BiDownArrowCircle, BiUpArrowCircle } from "react-icons/bi";
import InnerData from "./InnerData";
import CardForm from "./CardForm";
function HeroSection() {
  return (
    <>
      <section id="hero" className="hero-section">
        <div className="container py-5 my-3">
          <div className="row">
            <div className="col">
              <div id="carouselExampleFade" className="carousel slide ">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="container mt-5 pt-5">
                      <div className="row d-flex justify-content-between">
                        <InnerData />
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="container mt-5 pt-5">
                      <div className="row">
                        <InnerData />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column align-items-end justify-content-center mb-4">
              <div className="">
                <button
                  className="btn btn-sm"
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide="prev"
                >
                  <BiUpArrowCircle className="fs-1 text-secondary" />
                </button>
              </div>
              <div className="">
                <button
                  className="btn btn-sm"
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide="next"
                >
                  <BiDownArrowCircle className="fs-1 text-secondary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CardForm />
    </>
  );
}

export default HeroSection;
