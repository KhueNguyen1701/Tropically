const userList = JSON.parse(localStorage.getItem('userList')) || []

const form = document.getElementById('form')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm-password')
const message = document.getElementById('message')

form.onsubmit = function (event) {
    event.preventDefault()

    const newUser = {
        email: email.value,
        password: password.value,
        cartList: [],
    }

    let flag = false

    for (let user of userList) {
        if (user.email == newUser.email) {
            message.textContent = 'You have already registered.'
            flag = true
            break
        }
    }

    if (!flag) {
        if ((password.value != '') && (email.value != '')) {
            if (password.value == confirmPassword.value) {
                userList.push(newUser)

                email.value = ''
                password.value = ''
                confirmPassword.value = ''

                localStorage.setItem('userList', JSON.stringify(userList))

                // Chuyen den trang dang nhap
                window.location.href = '../earthday-login/earthday-login.html'
                console.log(password, confirmPassword)
            }
            else {
                message.textContent = "Password does not match."
            }
        }
        else {
            message.textContent = "Password and email can not be empty."
        }
    }
}


