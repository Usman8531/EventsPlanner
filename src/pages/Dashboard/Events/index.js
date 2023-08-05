import React from "react";
import { Route, Routes } from "react-router-dom";
import Table from "./Table";
import Add from "./Add";
import RecentEvents from "./RecentEvents";
import AllRecentEvents from "./AllRecentEvents";

export default function Index() {
  return (
    <Routes>
      <Route index element={<Table />} />
      <Route path="/add" element={<Add />} />
      <Route path="/addRecentEvents" element={<RecentEvents />} />
      <Route path="/RecentEvents" element={<AllRecentEvents />} />
    </Routes>
  );
}
