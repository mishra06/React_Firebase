// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj31YwaO7VslAQnXvMWQHimODqYMx0YsU",
  authDomain: "fir-project-77655.firebaseapp.com",
  projectId: "fir-project-77655",
  storageBucket: "fir-project-77655.appspot.com", // Firebase Storage bucket
  messagingSenderId: "398649187932",
  appId: "1:398649187932:web:523e3ae28fc5e17505d099",
  measurementId: "G-FZGPTK71T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider()


export { app,googleProvider,facebookProvider }
