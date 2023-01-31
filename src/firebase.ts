// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4bOVMaSxROoYin2NNHYONW_bfpQqX3tQ",
  authDomain: "divide-ai-b0685.firebaseapp.com",
  projectId: "divide-ai-b0685",
  storageBucket: "divide-ai-b0685.appspot.com",
  messagingSenderId: "702159493473",
  appId: "1:702159493473:web:92479b05ee0a69d42acd20",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
