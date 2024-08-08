import { firestore } from "config/firebase";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { BsBookmarkCheck } from "react-icons/bs";
// import { useParams } from "react-router-dom";

function OrderFoam({ data }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    quantity: "",
  });
  // const { id } = useParams();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [orderItems, setOrderItems] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, phone, email, quantity } = formData;
    if (
      !name ||
      !isEmailValid(email) ||
      !phone ||
      !quantity ||
      quantity === "Open this select menu"
    ) {
      window.toastify("Fill the form correctly", "error");
      return;
    }

    const orderData = {
      event: data,
      name,
      phone,
      email,
      quantity,
      createdAt: new Date(),
    };

    try {
      const docRef = await addDoc(collection(firestore, "orders"), orderData);
      const orderId = docRef.id;

      if (orderItems && orderItems.length > 0) {
        const orderItemsCollectionRef = collection(
          firestore,
          "orders",
          orderId,
          "orderItems"
        );

        for (let i = 0; i < orderItems.length; i++) {
          await addDoc(orderItemsCollectionRef, orderItems[i]);
        }
      }

      window.toastify("Request submitted!", "success");

      // Clear the form
      setFormData({
        name: "",
        phone: "",
        email: "",
        quantity: "",
      });
      setOrderItems([]);
    } catch (error) {
      console.error("Error adding document: ", error);
      window.toastify("Error submitting request", "error");
    }
  };
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-8">
            <p className="bg-secondary text-white py-3 ps-2 rounded-2">
              <BsBookmarkCheck className="fs-3" />
              <span className="fw-semibold fs-5">Book This Event</span>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="col-12 my-4">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                onChange={handleChange}
                value={formData.name}
                placeholder="Enter Full Name"
              />
            </div>
            <div className="col-12 my-4">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                onChange={handleChange}
                value={formData.phone}
                placeholder="Enter Phone Number"
              />
            </div>
            <div className="col-12 my-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                value={formData.email}
                placeholder="Enter Email"
              />
            </div>
            <div className="col-12 my-4">
              <label htmlFor="quantity">Quantity</label>
              <select
                id="quantity"
                className="form-select"
                name="quantity"
                onChange={handleChange}
                aria-label="Default select example"
              >
                <option selected>Open this select menu</option>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
              </select>
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-secondary rounded-1 w-100"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default OrderFoam;
