export function showToast(title, icon = 'success') {
    Swal.fire({
        position: 'top',
        backdrop: false,
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        icon,
        title,
    })
}
// Trong object nếu key và value giống nhau thì có thể bỏ value chỉ ghi key