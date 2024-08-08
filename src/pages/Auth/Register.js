import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, firestore } from "../../config/firebase";
import { FaGooglePlusG } from "react-icons/fa";
import { useAuthContext } from "contexts/AuthContext";
import { Link } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

const initialState = {
  email: "",
  password: "",
  fullName: "",
  confirmPassword: "",
};

export default function Register() {
  const { dispatch } = useAuthContext();
  const [state, setState] = useState(initialState);

  const handleChange = async (e) => {
    let { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { email, password, fullName, confirmPassword } = state;

    if (!email) {
      return window.toastify("No email Found", "error");
    }
    if (!password) {
      return window.toastify("No Password Found", "error");
    }
    if (!fullName) {
      return window.toastify("No Full Name Found", "error");
    }
    if (password !== confirmPassword) {
      return window.toastify("Passwords do not match", "error");
    }
    const data = {
      email: email,
      userName: fullName,
    };
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential;
        const collectionRef = collection(firestore, "user");
        await addDoc(collectionRef, data);
        window.toastify("Login SuccessFull", "success");
        dispatch({ type: "SET_LOGIN", payload: { user } });
      })
      .catch((error) => {
        window.toastify(error.message, "error");
      });
  };
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        window.toastify("user sign in", "success");
        dispatch({ type: "SET_LOGIN", payload: { user } });
      })
      .catch((error) => {
        const errorMessage = error.message;
        window.toastify(errorMessage, "error");
      });
  };

  return (
    <>
      <div className="container my-5 py-5 top-50 ">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="text-secondary fs-1 fw-bolder">Register</h2>
          </div>
          <div className="card shadow-lg border-0 col-lg-6 col-md-8 col-12 offset-md-2 offset-lg-3 py-3 my-3 auth-page">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                className="form-control w-100 my-3"
                placeholder="Full Name"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                className="form-control w-100"
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                className="form-control w-100 my-3"
                placeholder="Password"
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                className="form-control w-100 my-3"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
              <button className="btn btn-secondary">Register</button>
              <Link className="text-secondary mx-3" to={"/auth/login"}>
                Already have account...?
              </Link>
            </form>

            <button
              className="btn btn-secondary mt-3 w-50 "
              onClick={signInWithGoogle}
            >
              <FaGooglePlusG className="fs-3" /> With Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
