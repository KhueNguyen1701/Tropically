import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { app, db } from './firebase.js'

const auth = getAuth()

// Lấy dữ liệu sản phẩm từ Firebase
const querySnapshot = await getDocs(collection(db, "products",));
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
});


//---------- LẤY THÔNG TIN NGƯỜI DÙNG HIỆN TẠI ----------
// Khai báo user
const greeting = document.getElementById('greeting')
// Khai báo nút Logout
const logoutBtn = document.getElementById('logout-btn')
console.log(logoutBtn)
// Khai báo icon user
const loginBtn = document.getElementById('login-btn')
let userId

onAuthStateChanged(auth, (user) => {
    if (user) {
        userId = user.uid
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user

        if (user) {
            greeting.innerHTML = user.email

            // Ẩn nút login
            loginBtn.classList.add('d-none')

            // Hiện nút Logout
            logoutBtn.classList.remove('d-none')

            // Hiện avatar
            const avatarUrl = user.photoURL || './main imgs/default-avatar.jpg'
            avatar.setAttribute('src', avatarUrl)
            avatar.classList.remove('d-none')
        }
    } else {
        // User is signed out
        // Hiện nút login
        loginBtn.classList.remove('d-none')

        // Ẩn logout
        logoutBtn.classList.add('d-none')

        // Xoá user
        greeting.innerHTML = ''

        // Ẩn avatar
        avatar.classList.add('d-none')
    }

});

//---------- CHỨC NĂNG ĐĂNG XUẤT ----------

logoutBtn.onclick = function () {
    console.log('Hello')
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = './earthday-login/'
    }).catch((error) => {
        // An error happened.
    });
}



// Our Partners
tippy('#partner-1', {
    content: "Earthday.ca non-profit organization that inspires and supports people across Canada to connect with nature and build resilient communities. Their website provides information about their programs, initiatives, and events related to environmental education, conservation, and sustainability.",
    placement: 'bottom',
    followCursor: 'horizontal',

    // Chưa chạy
    animation: 'scale-subtle',
    theme: 'light',
});

tippy('#partner-2', {
    content: "Earthhero.com is an online marketplace that sells a wide range of sustainable products. It aims to help customers make eco-friendly choices and reduce their environmental impact.",
    placement: 'bottom',
    followCursor: 'horizontal',

    // Chưa chạy
    animation: 'scale-subtle',
    theme: 'light',
});

tippy('#partner-3', {
    content: "Ecosia is a search engine that plants trees while you search the web. They use the profit made from the searches to plant trees all over the world – particularly in Haiti, Brazil, Peru, Indonesia, Spain, Kenya, Ghana and more.",
    placement: 'bottom',
    followCursor: 'horizontal',

    // Chưa chạy
    animation: 'scale-subtle',
    theme: 'light',
});

// Footer
const guestList = JSON.parse(localStorage.getItem('guestList')) || []
const footerForm = document.getElementById('footer-form')
const guestName = document.getElementById('guest-name')
const guestEmail = document.getElementById('guest-email')
const message = document.getElementById('message')

footerForm.onsubmit = function (event) {

    if ((guestName.value != '') && (guestEmail.value != '') && (message.value != '')) {
        event.preventDefault()
        const newMessage = {
            guestName: guestName.value,
            guestEmail: guestEmail.value,
            message: message.value
        }
        guestList.push(newMessage)

        Swal.fire({
            title: 'Your message has been sent!',
            text: 'Please give us 1-2 days for response.',
            imageUrl: './main imgs/sweet-alert-pic.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })

        localStorage.setItem('guestList', JSON.stringify(guestList))
    }
    else {
        alert('Every box needs to be filled to submit.')
    }
}

// Scroll to top btn
//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}