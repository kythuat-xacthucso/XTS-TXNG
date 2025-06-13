// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5ayW4GkUVOqfcuDQM-Am4tkSrnCsiBPc",
  authDomain: "xts-fe.firebaseapp.com",
  projectId: "xts-fe",
  storageBucket: "xts-fe.firebasestorage.app",
  messagingSenderId: "1095061616602",
  appId: "1:1095061616602:web:6e8bd57781eb5a366672e3",
  measurementId: "G-K3S3ESW069"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);