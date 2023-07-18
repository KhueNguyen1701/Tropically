import { getAuth, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { showToast } from "../utils/showToast.js"
import { app } from '../firebase.js'

const auth = getAuth()

//---------- LẤY THÔNG TIN NGƯỜI DÙNG HIỆN TẠI ----------
const email = document.getElementById('email')
const displayName = document.getElementById('display-name')
const phone = document.getElementById('phone')
const avatar = document.getElementById('avatar')
const avatarUrl = document.getElementById('avatar-url')

function getCurrentUser() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user)
            if (user) {
                email.value = user.email
                displayName.value = user.displayName
                phone.value = user.phoneNumber
                avatarUrl.value = user.photoURL


                // Hiện avatar
                const photoUrl = user.photoURL || '../main imgs/default-avatar.jpg'
                avatar.setAttribute('src', photoUrl)
            }
        }
        else {
            window.location.href = '../earthday-login'
        }

    })
}
getCurrentUser()

// Người dùng đăng xuất
const logoutBtn = document.getElementById('logout-btn')
logoutBtn.onclick = function () {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = '../'
    }).catch((error) => {
        // An error happened.
    });
}

// Cập nhât thông tin người dùng
const profileForm = document.getElementById('profile-form')
profileForm.onsubmit = function (event) {
    event.preventDefault()

    updateProfile(auth.currentUser, {
        email: email.value,
        displayName: displayName.value,
        phoneNumber: phone.value,
        photoURL: avatarUrl.value,
    }).then(() => {
        // Profile updated!
        showToast('Successfully updated!')
        getCurrentUser()
    }).catch((error) => {
        // An error occurred
        console.log(error)
        showToast(error, 'error')
    });
}

// Command + chọn hàm --> Xem hàm gốc