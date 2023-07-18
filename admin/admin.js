import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { app, db } from '../firebase.js'
import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const auth = getAuth()
const tbody = document.getElementById('tbody')

// Lấy dữ liệu sp từ firebase
async function getProducts() {
    // Xoá dữ liệu cũ trước
    tbody.innerHTML = ''

    const querySnapshot = await getDocs(collection(db, 'products'));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        renderProduct(doc.id, doc.data())
    });
}
getProducts()



//---------- LẤY THÔNG TIN NGƯỜI DÙNG HIỆN TẠI ----------
// Khai báo user
const greeting = document.getElementById('greeting')
// Khai báo nút Logout
const logoutBtn = document.getElementById('logout-btn')

onAuthStateChanged(auth, (user) => {

    if (user && user.uid === 'ff2zXMfHlwaIWYT5xSqgFUgxASl1') {
        greeting.innerHTML = user.email

        // Hiện nút Logout
        logoutBtn.classList.remove('d-none')

        // Hiện avatar
        const avatarUrl = user.photoURL || '/main imgs/default-avatar.jpg'
        avatar.setAttribute('src', avatarUrl)
        avatar.classList.remove('d-none')
    }
    else {
        // User is signed out
        window.location.href = '../earthday-login/'

    }
});

//---------- CHỨC NĂNG ĐĂNG XUẤT ----------

logoutBtn.onclick = function () {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = '../earthday-login/'
    }).catch((error) => {
        // An error happened.
    });
}

function renderProduct(id, product) {
    // Tao va them class cho element card
    const tr = document.createElement('tr')
    const idTh = document.createElement('th')
    idTh.innerHTML = id

    const image = document.createElement('img')
    image.classList.add('table-img')
    image.setAttribute('src', product.image[0])

    // ------------------- HAM XU LY DOI HINH KHI RE CHUOT VAO --------------

    image.onmouseover = function changeImage() {
        image.setAttribute('src', product.image[1])
    }

    image.onmouseout = function changeImageBack() {
        image.setAttribute('src', product.image[0])
    }


    const imgTd = document.createElement('td')
    imgTd.appendChild(image)

    const nameTd = document.createElement('th')
    nameTd.innerHTML = product.name

    const priceTd = document.createElement('th')
    priceTd.innerHTML = product.price

    const rateTd = document.createElement('th')
    rateTd.innerHTML = product.rate


    // Tao element button them vao gio
    const editBtn = document.createElement('button')
    editBtn.classList.add('btn', 'btn-sm', 'btn-primary', 'rounded-pill', 'me-2')
    editBtn.innerHTML = 'Edit'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('btn', 'btn-sm', 'rounded-pill')
    if (product.show) {
        // Sản phẩm chưa bị xoá
        deleteBtn.classList.add('btn-danger')
        deleteBtn.innerHTML = 'Delete'
        deleteBtn.onclick = function () {
            deleteProduct(id)
        }
    }
    else {
        // Sản phẩm đã bị xoá
        deleteBtn.classList.add('btn-secondary')
        deleteBtn.innerHTML = 'Restore'
        deleteBtn.onclick = function () {
            restoreProduct(id)
        }
    }

    const actionsTd = document.createElement('td')
    actionsTd.appendChild(editBtn)
    actionsTd.appendChild(deleteBtn)

    // Tham element title, price va button vao card body
    tr.appendChild(idTh)
    tr.appendChild(imgTd)
    tr.appendChild(nameTd)
    tr.appendChild(priceTd)
    tr.appendChild(rateTd)
    tr.appendChild(actionsTd)

    tbody.appendChild(tr)

}

async function deleteProduct(productId) {
    const productRef = doc(db, "products", productId);

    await updateDoc(productRef, {
        show: false
    });
    getProducts()
}

async function restoreProduct(productId) {
    const productRef = doc(db, "products", productId);

    await updateDoc(productRef, {
        show: true
    });
    getProducts()
}