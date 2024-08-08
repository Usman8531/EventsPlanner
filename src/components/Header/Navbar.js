/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { Button, Drawer, Space } from "antd";
import { Link } from "react-router-dom";
import { auth } from "config/firebase";
import { useAuthContext } from "contexts/AuthContext";
import Logo from "assets/Img/logo.png";
import Avatar from "assets/Img/avatar.png";
import { CiMenuFries } from "react-icons/ci";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
export default function Navbar() {
  /////////////////// Drawer   ////////////
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const { isAuthenticated, user, dispatch } = useAuthContext();

  const handleLogout = () => {
    auth
      .signOut()
      .then((res) => {
        dispatch({
          type: "SET_LOGOUT",
        });
      })
      .catch((error) => {
        window.toastify(`You have an error ${error.message}`, "error");
      });
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;

    if (isScrolled) {
      header.classList.add("white");
    } else {
      header.classList.remove("white");
    }
  }, [isScrolled]);

  return (
    <>
      <header className="header" ref={headerRef}>
        <nav className="navbar navbar-expand-lg bg-body-tertiary my-2">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>
              <img src={Logo} alt="" className="img-fluid" />
            </Link>
            <button
              className="navbar-toggler border-0 shadow-lg "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={showDrawer}
            >
              <CiMenuFries className="fs-3 fw-bolder" />
            </button>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`collapse navbar-collapse `}
              id="navbarSupportedContent"
            >
              <Drawer
                placement={"left"}
                closable={false}
                onClose={onClose}
                open={open}
                title="Buy and Enjoy"
                key={1}
                width={"60%"}
                bodyStyle={{ backgroundColor: "#d3b3e4", color: "white" }}
                headerStyle={{ backgroundColor: "#d3b3e4", color: "white" }}
                footer={<></>}
                extra={
                  <Space>
                    <Button type="primary" onClick={onClose}>
                      OK
                    </Button>
                  </Space>
                }
                style={{
                  zIndex: 1,
                  height: "100%",
                  overflow: "auto",
                  paddingBottom: 53,
                }}
              >
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
                  <motion.li whileTap={{ scale: 0.9 }} className="nav-item">
                    <Link
                      className="nav-link fs-6 fw-lighter mx-3 active drawer-item"
                      aria-current="page"
                      to={"/"}
                    >
                      Home
                    </Link>
                  </motion.li>
                  <motion.li whileTap={{ scale: 0.9 }} className="nav-item ">
                    <ScrollLink
                      to={"events"}
                      className="nav-link fs-6 fw-lighter mx-3 drawer-item"
                    >
                      Events
                    </ScrollLink>
                  </motion.li>
                  <motion.li whileTap={{ scale: 0.9 }} className="nav-item ">
                    <ScrollLink
                      to={"about"}
                      className="nav-link fs-6 fw-lighter mx-3 drawer-item"
                    >
                      About
                    </ScrollLink>
                  </motion.li>
                  <motion.li
                    whileTap={{ scale: 0.9 }}
                    className="nav-item  my-3"
                  >
                    <Link
                      to="/bookEvent"
                      className="fs-6 fw-lighter mx-3 mx-3 px-3 btn btn-outline-secondary "
                    >
                      Get Ticket
                    </Link>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="nav-item dropdown"
                  >
                    <ScrollLink
                      to={"/"}
                      className="nav-link dropdown-toggle d-flex align-items-center"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={Avatar}
                        alt=""
                        className="img-fluid rounded-circle me-2"
                        style={{ width: "30px" }}
                      />
                      {/* {user.displayName} */}
                    </ScrollLink>
                    <ul
                      className="dropdown-menu dropdown-menu-end align-items-center"
                      aria-labelledby="navbarDropdown"
                    >
                      {!isAuthenticated ? (
                        <>
                          <motion.li
                            whileTap={{ scale: 0.9 }}
                            className="nav-item"
                          >
                            <Link to="/auth/register" className="nav-link">
                              Register
                            </Link>
                          </motion.li>
                        </>
                      ) : (
                        <>
                          {user.email === "usman@gmail.com" &&
                          "usman853136@gmail.com" ? (
                            <motion.li
                              whileTap={{ scale: 0.9 }}
                              className="nav-item text-white"
                            >
                              <Link
                                to="/dashboard"
                                className="btn btn-secondary border-0 rounded-0 text-center ms-3 mb-1"
                              >
                                Dashboard
                              </Link>
                            </motion.li>
                          ) : (
                            ""
                          )}
                          <motion.li
                            whileTap={{ scale: 0.9 }}
                            className="nav-item  text-white text-center mb-1 text-center"
                          >
                            <button
                              className="btn btn-outline-secondary rounded-0 mx-2"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </motion.li>
                        </>
                      )}
                    </ul>
                  </motion.li>
                </ul>
              </Drawer>
              <div className="d-none d-lg-block ms-auto">
                <ul className="navbar-nav   mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
                  <motion.li whileTap={{ scale: 0.9 }} className="nav-item">
                    <Link
                      className="nav-link fs-6 fw-lighter mx-3 active"
                      aria-current="page"
                      to={"/"}
                    >
                      Home
                    </Link>
                  </motion.li>
                  <motion.li whileTap={{ scale: 0.9 }} className="nav-item ">
                    <ScrollLink
                      to={"events"}
                      className="nav-link fs-6 fw-lighter mx-3"
                    >
                      Events
                    </ScrollLink>
                  </motion.li>
                  <motion.li whileTap={{ scale: 0.9 }} className="nav-item ">
                    <ScrollLink
                      to={"about"}
                      className="nav-link fs-6 fw-lighter mx-3"
                    >
                      About
                    </ScrollLink>
                  </motion.li>
                  <motion.li
                    whileTap={{ scale: 0.9 }}
                    className="nav-item  my-3"
                  >
                    <Link
                      to="/bookEvent"
                      className="fs-6 fw-lighter mx-3 mx-3 px-3 btn btn-outline-secondary"
                    >
                      Get Ticket
                    </Link>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="nav-item dropdown"
                  >
                    <a
                      href="#"
                      className="nav-link dropdown-toggle d-flex align-items-center"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={Avatar}
                        alt=""
                        className="img-fluid rounded-circle me-2"
                        style={{ width: "30px" }}
                      />
                      {/* {user.displayName} */}
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end align-items-center"
                      aria-labelledby="navbarDropdown"
                    >
                      {!isAuthenticated ? (
                        <>
                          <motion.li
                            whileTap={{ scale: 0.9 }}
                            className="nav-item"
                          >
                            <Link to="/auth/register" className="nav-link">
                              Register
                            </Link>
                          </motion.li>
                        </>
                      ) : (
                        <>
                          {user.email === "usman@gmail.com" &&
                          "usman853136@gmail.com" ? (
                            <motion.li
                              whileTap={{ scale: 0.9 }}
                              className="nav-item text-white"
                            >
                              <Link
                                to="/dashboard"
                                className="btn btn-secondary border-0 rounded-0 text-center ms-3 mb-1"
                              >
                                Dashboard
                              </Link>
                            </motion.li>
                          ) : (
                            ""
                          )}
                          <motion.li
                            whileTap={{ scale: 0.9 }}
                            className="nav-item  text-white text-center mb-1 text-center"
                          >
                            <button
                              className="btn btn-outline-secondary rounded-0 mx-2"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </motion.li>
                        </>
                      )}
                    </ul>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          </div>
        </nav>
      </header>
    </>
  );
}
