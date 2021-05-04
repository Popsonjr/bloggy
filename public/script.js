document.querySelector('#delete-button').addEventListener('click', (e) => {
    document.getElementById('delete-id').value = e.target.getAttribute("data-id")
    
})

document.querySelector('#edit-button').addEventListener('click', (e) => {
    let clickedPost = e.target
    let editForm = document.querySelector('#edit-form')
    let category = clickedPost.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent
    let cardBody = clickedPost.parentElement.parentElement.previousElementSibling
    let date = clickedPost.parentElement.previousElementSibling.textContent
    let title = cardBody.querySelector('.card-title').textContent
    let description = cardBody.querySelector('#post-description').textContent

    editForm.querySelector('.title').value = title.trim()
    editForm.querySelector('.category').value = category.trim()
    editForm.querySelector('.description').value = description.trim()
    editForm.querySelector('.date').value = date.trim()
    editForm.querySelector('#editId').value = e.target.getAttribute("data-id")

})

// function passId(postId) {
//     console.log(postId);
//     axios({
//         method: 'post',
//         url: '/delete',
//         data: {
//             id: postId
//         }
//     }).then((response) => {
        
//         console.log(response)
//     }).catch((error) => {
//         console.log(error);
//     })
// }


