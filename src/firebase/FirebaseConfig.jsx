
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNmG1jSsn2xj-L38ev0elceUWO2PclsvU",
  authDomain: "project-5ce20.firebaseapp.com",
  projectId: "project-5ce20",
  storageBucket: "project-5ce20.appspot.com",
  messagingSenderId: "1099290285148",
  appId: "1:1099290285148:web:3aa893af6c04567ac50299"
};


const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}