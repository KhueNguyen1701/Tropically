import products from './earthday.data.js'

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, increment, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { app, db } from '../firebase.js'
import { showToast } from "../utils/showToast.js"

const auth = getAuth()

// Test
const querySnapshot = await getDocs(collection(db, 'products'));
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    renderProduct(doc.id, doc.data())
});

// UPLOAD TO FIREBASE
// let firebaseProducts = products.data.map(product => {
//     return {
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         rate: Number((Math.random() * 2 + 3).toFixed(1)),
//         show: true
//     }
// })
// for (let product of firebaseProducts) {
//     // Add a new document with a generated id.
//     const docRef = await addDoc(collection(db, "products"), product)
//     console.log("Document written with ID: ", docRef.id);
// }


// RANDOM RA ĐÁNH GÍA
// Hàm toFixed: làm tròn, bên trong ngoặc chèn số sau dấu phẩy --> cho kết quả là string --> đổi lại thành số bằng Number()
// console.log(Number((Math.random() * 2 + 3).toFixed(1)))

// // Hien thi danh sach san pham
// for (let product of products.data) {
//     // Tao va them class cho element card
//     const card = document.createElement('div')
//     card.classList.add('card', 'w-100', 'h-100')

//     // Tao, them class cho img va gan gia tri cho thuoc tinh src
//     const image = document.createElement('img')
//     image.classList.add('card-img-top')
//     image.setAttribute('src', product.image[0])


//     // Tạo thẻ a
//     const imageWrapper = document.createElement('a')
//     imageWrapper.setAttribute('href', `./product.desc.html?id=${product.id}`)
//     imageWrapper.appendChild(image)

//     // Them img vao lam con cua card
//     card.appendChild(imageWrapper)

//     // Tao va them class cho element card body
//     const cardBody = document.createElement('div')
//     cardBody.classList.add('card-body', 'd-flex', 'flex-column')

//     // CHÈN ?ID SAU HREF
//     // Tao element name
//     const title = document.createElement('a')
//     title.setAttribute('href', `./product.desc.html?id=${product.id}`)
//     title.classList.add('card-title', 'mt-3', 'text-decoration-none', 'fs-5', 'fw-bold')
//     title.innerHTML = product.name

//     // Tao element price
//     const price = document.createElement('p')
//     price.classList.add('card-text', 'mt-auto')
//     price.innerHTML = product.price

//     // Tạo element rate
//     const rate = document.createElement('div')
//     rate.classList.add('small', 'mb-2')
//     for (let i = 1; i <= 5; i++) {
//         const rateStar = document.createElement('i')
//         rateStar.classList.add('fa-solid', 'fa-star')
//         rate.appendChild(rateStar)
//     }
//     const rateNumber = document.createElement('span')
//     rateNumber.innerHTML = ' (' + product.rate + ')'
//     rate.appendChild(rateNumber)

//     // Tao element button them vao gio
//     const addBtn = document.createElement('button')
//     addBtn.classList.add('btn', 'btn-success', 'w-100')
//     addBtn.innerHTML = 'Add to cart'

//     // Tham element title, price va button vao card body
//     cardBody.appendChild(title)
//     cardBody.appendChild(price)
//     cardBody.appendChild(rate)
//     cardBody.appendChild(addBtn)


//     // Tham element card body vao card
//     card.appendChild(cardBody)

//     // Tao element wrapper va them card vao
//     const wrapper = document.createElement('div')
//     wrapper.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mt-4')
//     wrapper.appendChild(card)

//     // Them wrapper vao list
//     const list = document.getElementById('list')
//     list.appendChild(wrapper)

//     // Xu ly khi nguoi dung bam vao nut "Add to cart"
//     addBtn.onclick = function () {
//         handleAddToCart(product)
//     }

// }

// ------------XU LY KHI NGUOI DUNG DA DANG NHAP-------------------
const user = JSON.parse(localStorage.getItem('user')) || null

// Khai báo user
const greeting = document.getElementById('greeting')
// Khai báo nút Logout
const logoutBtn = document.getElementById('logout-btn')

// Khai báo icon user
const iconUser = document.getElementById('icon-user')

if (user) {
    greeting.innerHTML = user.email

    // Ẩn icon user
    iconUser.classList.add('d-none')

    // Hiện nút Logout
    logoutBtn.classList.remove('d-none')
}

// ------------ XU LY KHI NGUOI DUNG DA DANG XUAT -------------------

logoutBtn.onclick = function () {
    // Xoá user trong localStorage
    localStorage.removeItem('user')

    // Hiện icon user
    iconUser.classList.remove('d-none')

    // Ẩn logout
    logoutBtn.classList.add('d-none')

    // Xoá user
    greeting.innerHTML = ''
    windoww.location.href = "./"
}


// --------------- XU LY GIO HANG ----------------------
let currentUserId

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUserId = user.uid
    }
})

let cartList = []
async function getCartList() {
    // Reset cart list
    cartList = []

    const querySnapshot = await getDocs(collection(db, "carts"));
    querySnapshot.forEach((doc) => {
        if (doc.data().userId === currentUserId) {
            // Chỉ lấy cart của người dùng hiện tại
            // Thêm cart id vào object
            cartList.push({ ...doc.data(), id: doc.id })
        }
    });
}


// const userList = JSON.parse(localStorage.getItem('userList')) || []
// // const cartList = JSON.parse(localStorage.getItem('cartList')) || []

// // Tạo 2 biến để lưu trữ vị trí user trong list
// let userIndex
// let currentUser

// let cartList
// if (user) {
//     for (let i = 0; i < userList.length; i++) {
//         if (userList[i].email == user.email) {
//             userIndex = i;
//             currentUser = userList[i];
//             cartList = currentUser.cartList;
//             // console.log(userIndex, currentUser, cartList);
//             renderCartItem()
//             break
//         }
//     }
// }

async function renderCartItem() {
    if (true) {
        const cart = document.getElementById('cart')
        cart.innerHTML = ''
        const quantity = document.getElementById('quantity')
        // ----- HÀM REDUCE -----
        // reduce( giá trị đã xử lý, giá trị mới)
        const cartTotalQuantity = cartList.reduce((total, current) => {
            return total + current.quantity
        }, 0)
        quantity.innerHTML = cartTotalQuantity
    }

    // Render sản phẩm trong giỏ
    for (let item of cartList) {
        //    Lấy  ttin sản phẩm từ productId trong cartItem
        const productRef = doc(db, "products", item.productId);
        const productSnap = await getDoc(productRef);
        const product = productSnap.data()


        const wrapper = document.createElement('div')
        wrapper.classList.add('d-flex', 'align-items-center', 'border-bottom', 'mt-3', 'cart-canvas-item')


        const image = document.createElement('img')
        image.classList.add('cart-image')
        image.setAttribute('src', (product.image[0]))

        wrapper.appendChild(image)

        const info = document.createElement('div')
        info.classList.add('ms-3')

        const title = document.createElement('div')
        title.classList.add('fw-bold', 'mb-0')

        const name = document.createElement('span')
        name.innerHTML = product.name

        const quantity = document.createElement('span')
        quantity.classList.add('fw-normal', 'text-danger', 'ms-2')
        quantity.innerHTML = 'x' + item.quantity
        title.appendChild(name)
        title.appendChild(quantity)

        const price = document.createElement('small')
        price.classList.add('text-muted')
        price.innerHTML = 'x' + product.price

        // Thêm nút xoá sản phẩm
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('btn', 'btn-outline-dark', 'ms-auto')
        deleteBtn.innerHTML = 'X'

        // Remove item trong cart
        deleteBtn.onclick = function () {
            deleteItem(item.id)
        }

        info.appendChild(title)
        info.appendChild(price)

        wrapper.appendChild(info)
        wrapper.appendChild(deleteBtn)

        cart.appendChild(wrapper)
    }
    // ------------------- HAM THANH TOAN, XOA TOAN BO SAN PHAM --------------
    function cartPurchase() {
        let emptyCart = document.querySelector(".offcanvas-body")
        // let emptyCart = purchaseBtn.parentElement.firstElementChild
        emptyCart.remove()
        cartList = []
        localStorage.setItem('userList', JSON.stringify(userList))
    }

    const purchaseBtn = document.getElementById('purchaseBtn')
    purchaseBtn.onclick = function () {
        cartPurchase()
        Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title: 'You have successfully purchase!',
            showConfirmButton: true,
            timer: 3000,
        })
    }
}

async function renderCart() {
    await getCartList()
    renderCartItem()
}
renderCart()

// // Thêm nút xoá sản phẩm
// const deleteBtn = document.createElement('button')
// deleteBtn.classList.add('btn', 'btn-outline-dark', 'ms-auto')
// deleteBtn.innerHTML = 'X'

// ------------------- HAM XU LY THEM SAN PHAM VAO GIO --------------
async function handleAddToCart(selectedId) {
    // const index = products.data.indexOf(product)

    let duplicated = false

    // Kiem tra sp nguoi dung vua click da co trong gio chua
    if (cartList.length > 0) {
        for (let item of cartList) {
            if (item.productId === selectedId) {
                duplicated = true
                showToast('You have added an item to cart')
                // Trùng --> cập nhật số lượng
                const cartItemRef = doc(db, "carts", item.id);
                await updateDoc(cartItemRef, {
                    quantity: increment(1)
                });
                break
            }
        }
    }

    if (!duplicated) {
        // Không trùng --> Thêm mới
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "carts"), {
            userId: currentUserId,
            productId: selectedId,
            quantity: 1,
        });

        showToast('You have added a new item to cart')

        // Cập nhật lại cartList trong currentUser trong userList
        //     currentUser.cartList = cartList
        //     userList[userIndex] = currentUser
        //     localStorage.setItem('userList', JSON.stringify(userList))
        // }

        // // Thay doi so luong sp trong gio
        // renderCartItem()
    }
    renderCart();
}


// ------------------- NUT SCROLL TO TOP --------------
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


function renderProduct(id, product) {
    if (product.show) {

        // Tao va them class cho element card
        const card = document.createElement('div')
        card.classList.add('card', 'w-100', 'h-100')

        // Tao, them class cho img va gan gia tri cho thuoc tinh src
        const image = document.createElement('img')
        image.classList.add('card-img-top')
        image.setAttribute('src', product.image[0])

        // ------------------- HAM XU LY DOI HINH KHI RE CHUOT VAO --------------

        image.onmouseover = function changeImage() {
            image.setAttribute('src', product.image[1])
        }

        image.onmouseout = function changeImageBack() {
            image.setAttribute('src', product.image[0])
        }


        // Tạo thẻ a
        const imageWrapper = document.createElement('a')
        imageWrapper.setAttribute('href', `./product.desc.html?id=${id}`)
        imageWrapper.appendChild(image)

        // Them img vao lam con cua card
        card.appendChild(imageWrapper)

        // Tao va them class cho element card body
        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body', 'd-flex', 'flex-column')

        // CHÈN ?ID SAU HREF
        // Tao element name
        const title = document.createElement('a')
        title.setAttribute('href', `./product.desc.html?id=${id}`)
        title.classList.add('card-title', 'mt-3', 'text-decoration-none', 'fs-5', 'fw-bold')
        title.innerHTML = product.name

        // Tao element price
        const price = document.createElement('p')
        price.classList.add('card-text', 'mt-auto')
        price.innerHTML = product.price + 'đ'

        // Tạo element rate
        const rate = document.createElement('div')
        rate.classList.add('small', 'mb-2')
        for (let i = 1; i <= 5; i++) {
            const rateStar = document.createElement('i')
            rateStar.classList.add('fa-solid', 'fa-star')
            rate.appendChild(rateStar)
        }
        const rateNumber = document.createElement('span')
        rateNumber.innerHTML = ' (' + product.rate + ')'
        rate.appendChild(rateNumber)

        // Tao element button them vao gio
        const addBtn = document.createElement('button')
        addBtn.classList.add('btn', 'btn-success', 'w-100')
        addBtn.innerHTML = 'Add to cart'

        // Tham element title, price va button vao card body
        cardBody.appendChild(title)
        cardBody.appendChild(price)
        cardBody.appendChild(rate)
        cardBody.appendChild(addBtn)


        // Tham element card body vao card
        card.appendChild(cardBody)

        // Tao element wrapper va them card vao
        const wrapper = document.createElement('div')
        wrapper.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mt-4')
        wrapper.appendChild(card)

        // Them wrapper vao list
        const list = document.getElementById('list')
        list.appendChild(wrapper)

        // Xu ly khi nguoi dung bam vao nut "Add to cart"
        addBtn.onclick = function () {
            handleAddToCart(id)
        }
    }
}

// ------------------- HAM XU LY XOA SAN PHAM KHOI GIO --------------
async function deleteItem(itemId) {
    await deleteDoc(doc(db, "carts", itemId));
    showToast('You have deleted an item', 'error')
    renderCart()
}

// Làm phần edit!!1