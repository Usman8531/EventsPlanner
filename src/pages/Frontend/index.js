import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";

// components
import Header from "components/Header";
import Footer from "components/Footer";
import BookNow from "./BookNow";
import NoPage from "./NoPage";

export default function index() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/buyNow/:id" element={<BookNow />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
