document.querySelector('#delete-button').addEventListener('click', (e) => {
    document.getElementById('delete-id').value = e.target.getAttribute("data-id")
    
})

let editButtons =document.querySelectorAll('#edit-button')
editButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        let clickedPost = e.target
        let editForm = document.querySelector('#edit-form')
        let category = clickedPost.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent
        let cardBody = clickedPost.parentElement.parentElement.previousElementSibling
        let date = clickedPost.parentElement.previousElementSibling.textContent
        let title = cardBody.querySelector('.card-title').textContent
        let description = cardBody.querySelector('#post-description').textContent
        
        // putting the data in the form for editing
        editForm.querySelector('.title').value = title.trim()
        editForm.querySelector('.category').value = category.trim()
        editForm.querySelector('.description').value = description.trim()
        editForm.querySelector('.date').value = date.trim()
        editForm.querySelector('#editId').value = e.target.getAttribute("data-id")
    })
})



