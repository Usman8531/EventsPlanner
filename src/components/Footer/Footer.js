/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <>
        {/* Remove the container if you want to extend the Footer to full width. */}
        <div
          className="bg-dark container-fluid py-4"
          style={{ backgroundColor: "#2d373c" }}
        >
          {/* Footer */}
          <footer className="text-center text-lg-start text-white">
            {/* Grid container */}
            <div className="container py-5 ">
              {/* Section: Links */}
              <div className="row d-flex justify-content-around align-items-center">
                <div className="col-lg-4">
                  <h4>Quick Links</h4>
                  <ul className="footer_list text-decoration-none list-unstyled">
                    <li className="py-2">
                      <a
                        href=""
                        className="text-decoration-none text-white my-3 py-2"
                      >
                        About Us
                      </a>
                    </li>
                    <li className="py-2">
                      <a
                        href=""
                        className="text-decoration-none text-white my-3 py-2"
                      >
                        Reviews
                      </a>
                    </li>
                    <li className="py-2">
                      <a
                        href=""
                        className="text-decoration-none text-white my-3 py-2"
                      >
                        FAQ's
                      </a>
                    </li>
                    <li className="py-2">
                      <a
                        href=""
                        className="text-decoration-none text-white my-3 py-3"
                      >
                        Policies
                      </a>
                    </li>
                    <li className="py-2">
                      <a
                        href=""
                        className="text-decoration-none text-white my-3 py-2"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4">
                  <h4 className="fw-bold fs-3 text-center">
                    SUBSCRIBE OUR NEWSLETTER
                  </h4>
                  <p className="text-secondary fs-6 text-center fw-bolder">
                    DON’T MISS OUR FEATURE UPDATE
                  </p>
                  <div className="container">
                    <div className="row">
                      <div className="input-group py-4">
                        {" "}
                        <input
                          type="email"
                          name="email"
                          required=""
                          className="form-control py-3"
                          placeholder="Enter Your Email Address"
                        />
                        <button
                          type="submit"
                          className="py-3 btn btn-secondary"
                        >
                          Subscribe
                        </button>
                      </div>{" "}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 text-center">
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <h4 className="text-start ">Contact Us</h4>
                    <p>We're ready to help!</p>
                    <ul className="footer_list list-unstyled">
                      <li>USA | CANADA</li>
                      <li className="phone">+1 555 555 5555</li>
                      <li>UK | IRELAND</li>
                      <li className="phone">+555 5 555 5555</li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr className="my-3" />
              <section className="p-3 pt-0">
                <div className="row d-flex align-items-center">
                  <div className="col-md-7 col-lg-8 text-center text-md-start">
                    <div className="p-3">
                      &copy; {year} Copyright:
                      <a className="text-white my-3 py-2 text-decoration-none">
                        Muhammad Usman
                      </a>
                    </div>
                  </div>
                  <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                    <a
                      href="https://web.facebook.com/profile.php?id=100054508777162"
                      target={"_blank"}
                      className="text-white me-4"
                    >
                      <FaFacebook className="fs-5 border-1 border-secondary" />
                    </a>
                    <a className="text-white me-4">
                      <FaTwitter className="fs-5 border-1 border-secondary" />
                    </a>
                    <a
                      href="https://www.instagram.com/musman.47/"
                      className="text-white me-4"
                      target={"_blank"}
                    >
                      <FaInstagram className="fs-5 border-1 border-secondary" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mernstack-usman/"
                      className="text-white me-4"
                      target="_blank"
                    >
                      <FaLinkedinIn className="fs-5 border-1 border-secondary" />
                    </a>
                    <a
                      href="https://github.com/Usman8531"
                      target={"_blank"}
                      className="text-white me-4"
                    >
                      <FaGithub className="fs-5 border-1 border-secondary" />
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </footer>
        </div>
      </>
    </>
  );
}
