/* eslint-disable react-hooks/exhaustive-deps */
import PreLoader from "components/Preloader/PreLoader";
import OrderFoam from "components/SingleEvent/OrderFoam";
import ProductImg from "components/SingleEvent/ProductImg";
import { firestore } from "config/firebase";
import { useAuthContext } from "contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import { useParams } from "react-router-dom";
export default function BookNow() {
  const { id } = useParams();
  const { dispatch } = useAuthContext();
  const [data, setData] = useState(null);
  const getItem = async () => {
    const docRef = doc(firestore, "events", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
      //   console.log("Document data:", docSnap.data());
      console.log(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  // getItem();
  useEffect(() => {
    getItem();
  }, []);
  useEffect(() => {
    dispatch({
      type: "GET_SINGLE_EVENT",
      payload: data,
    });
  }, []);

  return (
    <>
      {data ? (
        <>
          <div className="container-fluid mx-0 ps-0 pe-0 overflow-hidden bookNow-hero-section">
            <div className="row">
              <div className="col-lg-6 col-12 my-5 py-5">
                <div className="container ms-5 ps-5">
                  <div className="row">
                    <div className="col">
                      {" "}
                      <h2 className="fw-bold display-5">Event Details</h2>
                      <p className="text-muted fw-bold fs-5">
                        Home{" "}
                        <span className="text-secondary">
                          <BiRightArrow /> Details
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mt-5 pt-3">
            <div className="row">
              <div className="col-md-8 col-12">
                <ProductImg data={data} />
              </div>
              <div className="col-md-4 col-12">
                <OrderFoam data={data} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="my-5 py-5 d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <PreLoader />
          </div>
        </>
      )}
    </>
  );
}
