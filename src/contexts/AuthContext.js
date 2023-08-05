import { auth } from "config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { reducer } from "./reducer";

const initialState = {
  isAuthenticated: false,
  user: {},
  events: null,
  details: null,
  singleEvent: null,
};

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {

    onAuthStateChanged(auth, user => {

      if (user) {
        dispatch({ type: "SET_LOGIN", payload: { user } })
      }

      setIsAppLoading(false)
    })

  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, isAppLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext)
