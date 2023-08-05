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
  // Drawer state
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  // Authentication context
  const { isAuthenticated, user, dispatch } = useAuthContext();

  // Logout function
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => dispatch({ type: "SET_LOGOUT" }))
      .catch((error) => {
        window.toastify(`You have an error ${error.message}`, "error");
      });
  };

  // Scroll state and effect
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.pageYOffset > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    isScrolled
      ? header.classList.add("white")
      : header.classList.remove("white");
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
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <Drawer
                placement="left"
                closable={false}
                onClose={onClose}
                open={open}
                title="Buy and Enjoy"
                key={1}
                width="60%"
                bodyStyle={{ backgroundColor: "#d3b3e4", color: "white" }}
                headerStyle={{ backgroundColor: "#d3b3e4", color: "white" }}
                footer={null}
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
                  <MenuItem to="/" text="Home" isActive={true} />
                  <MenuItem to="events" text="Events" />
                  <MenuItem to="about" text="About" />
                  <MenuItem to="/bookEvent" text="Get Ticket" />
                  <UserDropdown
                    isAuthenticated={isAuthenticated}
                    user={user}
                    handleLogout={handleLogout}
                  />
                </ul>
              </Drawer>
              <div className="d-none d-lg-block ms-auto">
                <ul className="navbar-nav mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
                  <MenuItem to="/" text="Home" isActive={true} />
                  <MenuItem to="events" text="Events" />
                  <MenuItem to="about" text="About" />
                  <MenuItem to="/bookEvent" text="Get Ticket" />
                  <UserDropdown
                    isAuthenticated={isAuthenticated}
                    user={user}
                    handleLogout={handleLogout}
                  />
                </ul>
              </div>
            </motion.div>
          </div>
        </nav>
      </header>
    </>
  );
}

// Reusable MenuItem component
function MenuItem({ to, text, isActive }) {
  const linkProps = {
    className: `nav-link fs-6 fw-lighter mx-3 ${isActive ? "active" : ""}`,
    "aria-current": isActive ? "page" : null,
  };

  if (isActive) {
    return (
      <motion.li whileTap={{ scale: 0.9 }} className="nav-item">
        <Link to={to} {...linkProps}>
          {text}
        </Link>
      </motion.li>
    );
  }

  return (
    <motion.li whileTap={{ scale: 0.9 }} className="nav-item">
      <ScrollLink to={to} {...linkProps}>
        {text}
      </ScrollLink>
    </motion.li>
  );
}

// Reusable UserDropdown component
function UserDropdown({ isAuthenticated, user, handleLogout }) {
  return (
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
      </a>
      <ul
        className="dropdown-menu dropdown-menu-end align-items-center"
        aria-labelledby="navbarDropdown"
      >
        {!isAuthenticated ? (
          <MenuItem to="/auth/register" text="Register" />
        ) : (
          <>
            {user.email === "usman@gmail.com" && "usman853136@gmail.com" && (
              <MenuItem to="/dashboard" text="Dashboard" />
            )}
            <li className="nav-item text-white text-center mb-1 text-center">
              <button
                className="btn btn-outline-secondary rounded-0 mx-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </motion.li>
  );
}
