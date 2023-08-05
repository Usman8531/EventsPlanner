// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// console.log(process.env);
const firebaseConfig = {
  apiKey: "AIzaSyCl-vXuSr9hk8O4AWKpHib7X-xrg3OOSTQ",
  authDomain: "eventplannerlab.firebaseapp.com",
  projectId: "eventplannerlab",
  storageBucket: "eventplannerlab.appspot.com",
  messagingSenderId: "875749715283",
  appId: "1:875749715283:web:4ca7f94096cb65aacd45a6",
  measurementId: "G-JCVRXF56EF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// ////////////    set data into firestore    ////////////////////
const setData = async (data) => {
  const latestEvent = doc(firestore, "events", data.id);

  // later...
  await setDoc(latestEvent, data, { merge: true });
};

// //////////////////  get data from firestore  ///////////////////

const getData = async () => {
  const items = await getDocs(query(collection(firestore, "events")));
  return items.docs.map((doc) => doc.data());
};

export { analytics, auth, firestore, storage, setData, getData, app };
