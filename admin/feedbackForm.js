// import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
// import { collection, getDocs, addDoc, doc, getDoc, updateDoc, increment, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
// import { app, db } from '../firebase.js'
// import { showToast } from "../utils/showToast.js"

// const auth = getAuth()

// var messagesRef = firebase.database().ref('messages');
// const form = document.getElementById('footer-form')
// form.addEventListener('submit', submitForm);

// // submit form
// function submitForm(e) {
//     e.preventDefault();

//     const name = getInputVal('guest-name');
//     const email = getInputVal('guest-email');
//     const message = getInputVal('message');

//     saveMessage(name, email, message)


// }

// function getInputVal(id) {
//     return document.getElementById(id).value;
// }

// function saveMessage(name, email, message) {
//     let newMessageRef = messagesRef.push();
//     newMessageRef.set({
//         name: name,
//         email: email,
//         message: message,
//     });
// }

