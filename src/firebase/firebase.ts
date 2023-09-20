// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAIMqAPdjTP7uv-AJhtdMKHkAfTJlGZ8UE",
    authDomain: "my-pro-c1f47.firebaseapp.com",
    projectId: "my-pro-c1f47",
    storageBucket: "my-pro-c1f47.appspot.com",
    messagingSenderId: "685498767506",
    appId: "1:685498767506:web:d718b176e1499fe7382e4b",
    measurementId: "G-NXWZF942FJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);