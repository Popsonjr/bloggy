function postTemplate(post) {
    return `
        <div class="card text-center text-dark mb-5">
            <div class="card-header">
                ${post.category}
            </div>
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" class="card-img-top" alt="">
            <div class="card-body px-5 text-left">
                <h4 class="card-title">${post.title}</h4>
                <p>${post.description}</p>
                <div class="btn btn-dark">Read More</div>
            </div>
            <div class="card-footer text-muted d-flex justify-content-between">
                <div class="px-4">${post.date}</div>
                <div><i data-id="${post._id}" class="fa fa-trash px-4"></i><i data-id="${post._id}" class="fa fa-edit" data-bs-toggle="modal" data-bs-target="#edit"></i></div>
            </div>
        </div>
    `
}

// initial page load posts
let ourPost = posts.map((post) => {
    return postTemplate(post)
}).join('')
document.getElementById('posts').insertAdjacentHTML("beforeend", ourPost)

// add a new post
let postForm = document.querySelector('.form')

postForm.addEventListener('submit', (e) => {
    let postTitle = postForm.querySelector('input.title')
    let postDescription = document.querySelector('input.description')
    let postCategory = document.querySelector('input.category')
    let postDate = document.querySelector('input.date')

    e.preventDefault()
    axios.post('/create', {title: postTitle.value, description: postDescription.value, category: postCategory.value, date: postDate.value}).then((response) => {
        document.getElementById('posts').insertAdjacentHTML("beforeend", postTemplate(response.data)) 
    }).catch(() => {
        console.log('Axios problem with create')
    })
    postTitle.value = ''
    postCategory.value = ''
    postDescription.value = ''
    postDate.value = ''
    alert("Post Created")
})

// delete a post
document.addEventListener("click", (e) => {
    let clicked = e.target
    if (clicked.classList.contains("fa-trash")) {
        if (confirm("Do you want to delete this post ?")) {
            axios.post('/delete', {id: clicked.getAttribute("data-id")}).then(()=> {
                clicked.parentElement.parentElement.parentElement.remove()
            }).catch( () => {
                console.log("Axios delete problem")
            })
        }
    }
    })

// update a post
let x 
let editButtons = document.querySelectorAll('.fa-edit')
editButtons.forEach(edit => {
    edit.addEventListener('click', (e) => {
        x = e.target.getAttribute("data-id")
    })
})



let editForm = document.querySelector('#form')
editForm.addEventListener("submit", (e) => {
    let clicked = e.target
    let postTitle = editForm.querySelector('input.title')
    let postDescription = editForm.querySelector('input.description')
    let postCategory = editForm.querySelector('input.category')
    let postDate = editForm.querySelector('input.date')

    e.preventDefault()

        
            axios.post('/edit', {id: x, title: postTitle.value, description: postDescription.value, category: postCategory.value, date: postDate.value}).then((response) => {
                    // console.log(response.data.title);
                    alert("post updated successfully")
                    postTitle.value = ""
                    postDescription.value = ""
                    postCategory.value = ""
                    postDate.value = ""
                    
                    //come back to input previous value in the form box

                }).catch( () => {
                    console.log("Axios edit problem")
                })
            
        
       
})
    