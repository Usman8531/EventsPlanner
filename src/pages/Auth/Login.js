import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { useAuthContext } from "contexts/AuthContext";
import { FaGooglePlusG } from "react-icons/fa";
import { Link } from "react-router-dom";
const initialState = { email: "", password: "" };
export default function Login() {
  const { dispatch } = useAuthContext();

  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = state;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user sign in", user);
        dispatch({ type: "SET_LOGIN", payload: { user } });
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.error(error);
        window.toastify(error.message.slice(9), "error");
        // ..
      });
  };
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        window.toastify("user sign in", "success");
        dispatch({ type: "SET_LOGIN", payload: { user } });
        // //...
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        window.toastify(errorMessage, "error");
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="my-5 py-5 top-50">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="text-secondary fs-1 fw-bolder">Login</h2>
          </div>
          <div className="card shadow-lg border-0 col-lg-6 col-md-8 col-12 offset-md-2 offset-lg-3 py-3 my-3 auth-page">
            <form onSubmit={handleSubmit}>
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
                className="form-control my-3 w-100"
                placeholder="Password"
                onChange={handleChange}
              />
              <button className="btn btn-secondary px-3">Login</button>
              <Link className="text-secondary mx-3" to={"/auth/register"}> Don't have Account......!</Link>
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
    </div>
  );
}
