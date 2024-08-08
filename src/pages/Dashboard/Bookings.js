import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../config/firebase";
// import { useAuthContext } from "contexts/AuthContext";
// import { event } from "utils/FakeApi";

function OrdersList() {
  // const { singleEvent } = useAuthContext()
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [rejectedOrders, setRejectedOrders] = useState([]);
  const [showAcceptedOrders, setShowAcceptedOrders] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "orders"));
        const ordersData = querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const orderId = doc.id;

          const orderItemsCollectionRef = collection(
            firestore,
            "orders",
            orderId,
            "orderItems"
          );
          const orderItemsQuerySnapshot = await getDocs(
            orderItemsCollectionRef
          );
          const orderItemsData = orderItemsQuerySnapshot.docs.map((doc) =>
            doc.data()
          );

          return { ...data, id: orderId, orderItems: orderItemsData };
        });
        Promise.all(ordersData).then((data) => {
          setOrders(data);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };
    fetchData();
  }, []);

  // Function to handle accepting an order
  const handleAcceptOrder = async (order) => {
    console.log(order);
    let quantity = Number(order.quantity)
    // console.log(quantity);
    let participants = order.event.participants + quantity
    // console.log(participants);
    try {
      // Add the accepted order to the "acceptedOrders" state
      setAcceptedOrders([...acceptedOrders, order]);

      // Remove the accepted order from the "orders" state
      setOrders(orders.filter((o) => o.id !== order.id));

      // Add the accepted order to Firestore
      await addDoc(collection(firestore, "acceptedOrders"), order);
      const updateRef = doc(firestore, "events", order.event.id);

      // Set the "capital" field of the city 'DC'
      await updateDoc(updateRef, { participants });
      window.toastify("Order accepted: ", "success");
    } catch (error) {
      console.error("Error accepting order: ", error);
    }
  };

  // Function to handle rejecting an order
  const handleRejectOrder = async (order) => {
    try {
      // Add the rejected order to the "rejectedOrders" state
      setRejectedOrders([...rejectedOrders, order]);

      // Remove the rejected order from the "orders" state
      setOrders(orders.filter((o) => o.id !== order.id));

      // Delete the rejected order from Firestore
      await deleteDoc(doc(firestore, "orders", order.id));

      window.toastify("Order rejected: ", "info");
    } catch (error) {
      console.error("Error rejecting order: ", error);
    }
  };

  // Function to handle showing/hiding the accepted orders
  const handleShowAcceptedOrders = () => {
    setShowAcceptedOrders(!showAcceptedOrders);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4 text-secondary text-center fw-semibold">Orders List</h2>
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <div className="table-responsive card">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Quantity</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <td>{order.id}</td>
                          <td>{order.name}</td>
                          <td>{order.phone}</td>
                          <td>{order.email}</td>
                          <td>{order.quantity}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div>
                                {order.orderItems.map((item, index) => (
                                  <p key={index} className="mb-0">
                                    {item.name} ({item.quantity})
                                  </p>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-success me-2"
                              onClick={() => handleAcceptOrder(order)}
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => handleRejectOrder(order)}
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {acceptedOrders.length > 0 && !showAcceptedOrders && (
                  <button
                    className="btn btn-primary my-3"
                    onClick={handleShowAcceptedOrders}
                  >
                    View Accepted Orders ({acceptedOrders.length})
                  </button>
                )}
              </>
            )}

            {/* Show accepted orders */}
            {showAcceptedOrders && (
              <div className="table-responsive card">
                <table className="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acceptedOrders.map((order, index) => (
                      <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.name}</td>
                        <td>{order.phone}</td>
                        <td>{order.email}</td>
                        <td>{order.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="btn btn-secondary my-3"
                  onClick={handleShowAcceptedOrders}
                >
                  Hide Accepted Orders
                </button>
              </div>
            )}
          </div>
        </div>

        {rejectedOrders.length > 0 && (
          <div className="row my-5">
            <div className="col-12">
              <h2 className="mb-4">Rejected Orders</h2>
              <div className="table-responsive card">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rejectedOrders.map((order, index) => (
                      <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.name}</td>
                        <td>{order.phone}</td>
                        <td>{order.email}</td>
                        <td>{order.quantity}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div>
                              {order.orderItems.map((item, index) => (
                                <p key={index} className="mb-0">
                                  {item.name} ({item.quantity})
                                </p>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default OrdersList;
