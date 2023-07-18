// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmwoACc53a85LIAZ6F0cLBPxqTu5AXv_w",
    authDomain: "mindx-plantit.firebaseapp.com",
    projectId: "mindx-plantit",
    storageBucket: "mindx-plantit.appspot.com",
    messagingSenderId: "98151549021",
    appId: "1:98151549021:web:c541692c6ed3d5a78c25b4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
