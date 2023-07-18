import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { app, db } from '../firebase.js'
// import products from "./earthday.data.js"
// console.log(products)
// URL Search Params
const searchString = window.location.search
const searchParams = new URLSearchParams(searchString)
// Các phương thức như get/ getAll là hàm nên phía cuối phải có ngoặc tròn, trong ngoặc chèn tham số là phần đầu của params, sẽ trả về giá trị phía sau
// console.log(searchParams.get('id'))
// Kiểm tra xem có param đó hay không, nếu có trả về 'true', không thì trả về 'false'
// console.log(searchParams.has('id'))

// Duyệt qua toàn bộ sp xem cái nào có id giống cái được tìm kiếm
if (searchParams.has('id')) {
    // Lấy dữ liệu sản phẩm theo id từ Firebase
    const docRef = doc(db, 'products', searchParams.get('id'));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const image = document.getElementById('image')
        const name = document.getElementById('name')
        const rate = document.getElementById('rate')
        const price = document.getElementById('price')
        const desc = document.getElementById('description')

        image.setAttribute('src', docSnap.data().image[0])
        image.classList.add('mg-fluid')
        name.innerHTML = docSnap.data().name
        price.innerHTML = docSnap.data().price
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}