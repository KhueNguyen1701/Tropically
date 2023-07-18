import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { app } from "../firebase.js";
import { showToast } from "../utils/showToast.js"
const auth = getAuth();
const provider = new GoogleAuthProvider();

const userList = JSON.parse(localStorage.getItem('userList')) || []

const form = document.getElementById('form')
const email = document.getElementById('email')
const password = document.getElementById('password')
const googleBtn = document.getElementById('google-btn')

// Kiểm tra nếu người dùng đã đăng nhập thì chuyển về trang chủ
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = '../'
    }

});

form.onsubmit = function (event) {
    event.preventDefault()

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            // Signed in 
            if (user.uid === 'ff2zXMfHlwaIWYT5xSqgFUgxASl1') {
                window.location.href = '../admin'
            }
            else {
                const user = userCredential.user;
                showToast('Successfully signed in')
                window.location.href = '../'
            }
        })
        .catch((error) => {
            const errorMessage = error.message;
            showToast(errorMessage, 'error')
        });
}

// Login with google
googleBtn.onclick = function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            window.location.href = '../'
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}


// const userList = JSON.parse(localStorage.getItem('userList')) || []

// const form = document.getElementById('form')
// const email = document.getElementById('email')
// const password = document.getElementById('password')
// const message = document.getElementById('message')

// form.onsubmit = function (event) {
//     event.preventDefault()

//     const loginUser = {
//         email: email.value,
//         password: password.value,
//     }

//     let flag = false

//     // Biến 2 object thành 2 chuỗi rồi so sánh
//     for (let user of userList) {
//         if ((loginUser.email == user.email) && (loginUser.password == user.password)) {
//             flag = true
//             break
//         }
//         else if (loginUser.email != user.email) {
//             message.textContent = 'This account does not exist.'
//         }
//         else if (loginUser.password != user.password) {
//             message.textContent = 'Please enter the valid password.'
//             console.log(loginUser.password, user.password)
//         }
//     }

//     if (flag) {
//         // User ton tai (email va password chinh xac)
//         localStorage.setItem('user', JSON.stringify(loginUser))

//         email.value = ''
//         password.value = ''

//         // Chuyen den trang dang nhap
//         window.location.href = '../index.html'
//     }
// }
