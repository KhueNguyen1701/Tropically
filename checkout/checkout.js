import { app, db } from '../firebase.js'
import {
  getAuth,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js'
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js'
import { showToast } from '../utils/showToast.js'

const tbody = document.getElementById('tbody')
const subtotal = document.getElementById('subtotal')
const shipping = document.getElementById('shipping')
const total = document.getElementById('total')
const name = document.getElementById('name')
const phone = document.getElementById('phone')
const address = document.getElementById('address')
const checkoutForm = document.getElementById('checkout-form')

let subtotalValue = 0
let totalValue = 0

let currentUserId

const auth = getAuth()

onAuthStateChanged(auth, user => {
  if (user) {
    currentUserId = user.uid
  } else {
    // User is signed out
    window.location.href = '../'
  }
})

let cartList = []

async function getCartItems() {
  cartList = []
  // Lấy sản phẩm trong giỏ
  const querySnapshot = await getDocs(collection(db, 'carts'))
  querySnapshot.forEach(doc => {
    // doc.data() is never undefined for query doc snapshots
    if (doc.data().userId === currentUserId) {
      // Chi lay cart cua nguoi dung hien tai

      // Lấy ra thông tin sản phẩm

      const item = { ...doc.data(), id: doc.id } // Them cart id vao object
      cartList.push(item)
    }
  })
}

// Hiển thị sản phẩm trong giỏ
async function renderCartItems() {
  tbody.innerHTML = ''
  for (let item of cartList) {
    // Lay thong tin san pham tu productId trong cart item
    const productRef = doc(db, 'products', item.productId)
    const productSnap = await getDoc(productRef)
    const product = productSnap.data()

    // Thêm product vào object item của cartList
    item.product = product

    const productTd = document.createElement('td')

    const productWrapper = document.createElement('div')
    productWrapper.classList.add('d-flex', 'align-items-center')

    const image = document.createElement('img')
    image.classList.add('checkout-image')
    image.setAttribute('src', product.image[1])

    productWrapper.appendChild(image)

    productTd.appendChild(productWrapper)

    const quantityTd = document.createElement('td')
    quantityTd.innerHTML = item.quantity

    const priceTd = document.createElement('td')
    priceTd.innerHTML = product.price

    const amountTd = document.createElement('td')
    amountTd.classList.add('fw-bold')
    let amount
    // amount = product.price * item.quantity <---------- use this line
    amount = 540000 * item.quantity //<-------- do not use

    amountTd.innerHTML = amount + 'đ'

    const tr = document.createElement('tr')
    tr.appendChild(productTd)
    tr.appendChild(quantityTd)
    tr.appendChild(priceTd)
    tr.appendChild(amountTd)

    tbody.appendChild(tr)

    // Calculating subtotal
    subtotalValue += amount
  }
}

async function initOrderInfo() {
  subtotalValue = 0
  totalValue = 0

  await getCartItems()
  await renderCartItems()
  renderTotal()
}

initOrderInfo()

function renderTotal() {
  subtotal.innerHTML = subtotalValue + 'đ'

  totalValue =
    subtotalValue + Number(shipping.innerHTML) - Number(discount.innerHTML)
  total.innerHTML = totalValue + 'đ'
}

// Xử lý tạo đơn hàng
checkoutForm.onsubmit = async function (event) {
  event.preventDefault()

  // Kiểm tra các thông tin có hợp lệ hay không
  if (!name.value) {
    showToast('Please enter your information', 'error')
  }
  // else if()  <------ Kiểm tra thêm các thông tin khác
  else {
    // Tạo hóa đơn

    const orderItems = cartList.map(function (item) {
      return {
        productId: item.id,
        price: item.product.price,
        quantity: item.quantity,
        total: totalValue,
      }
    })

    const docRef = await addDoc(collection(db, 'orders'), {
      userId: currentUserId,
      products: orderItems,
      name: name.value,
      phone: phone.value,
      address: address.value,
      createdDate: new Date(),
    })

    // Xử lý khi đặt hàng thành công
    checkoutForm.reset() // <------ Xóa hết input

    // Xóa giỏ hàng
    for (let item of cartList) {
      await deleteDoc(doc(db, 'carts', item.id))
    }
    await initOrderInfo()

    // Hiển thị thông báo đặt hàng thành công
    showToast('Thank you for your purchase!')
  }
}
