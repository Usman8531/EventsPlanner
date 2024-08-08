/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Frontend from "./Frontend";
import Dashboard from "./Dashboard";
import Auth from "./Auth";
// import Footer from 'components/Footer/Footer'
// import Navbar from 'components/Header/Navbar'
import { useAuthContext } from "contexts/AuthContext";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import { firestore, getData } from "config/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Index() {
  const { isAuthenticated, dispatch } = useAuthContext();
  const fetchAllItems = async () => {
    await getData().then((events) => {
      // console.log(events);
      dispatch({
        type: "SET_ALL_EVENTS",
        payload: events,
      });
    });
  };
  useEffect(() => {
    fetchAllItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  ///////////////////////////////////////////////////////////////
  const getEventData = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "eventDetails")
      );
      const eventData = querySnapshot.docs.map((doc) => doc.data());
      // console.log("Event data:", eventData);
      return eventData;
    } catch (error) {
      window.toastify("Error While Getting data", "error");
      console.error("Error getting event data: ", error);
    }
  };
  useEffect(() => {
    getEventData().then((data) => {
      // console.log(data);
      dispatch({
        type: "SET_EVENT_DETAILS",
        payload: data,
      });
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/*" element={<Frontend />} />
        <Route
          path="/auth/*"
          element={!isAuthenticated ? <Auth /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/*"
          element={<PrivateRoute Component={Dashboard} />}
        />
      </Routes>
    </>
  );
}
