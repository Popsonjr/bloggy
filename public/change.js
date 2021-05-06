let loginAlertBox = document.querySelector('#alert-box')

if (loginAlertBox.textContent.trim()== "Account created successfully") {
    loginAlertBox.parentElement.classList.remove('alert-danger')
    loginAlertBox.parentElement.classList.add('alert-success')
}
