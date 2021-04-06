let express = require("express")

let app = express()
let mongodb = require('mongodb')
let sanitizeHTML = require('sanitize-html')

let port = process.env.PORT
if (port == null || port == "") {
    port = 5000
}

let db
let con = "mongodb+srv://todoAppUser:popo2403@cluster0.gka4p.mongodb.net/blogTest?retryWrites=true&w=majority"

mongodb.connect(con, {useNewUrlParser: true}, (err, client) => {
    db = client.db()
    app.listen(port)
})

app.use(express.json())

// make folder available from the root of server
app.use(express.static('public'))

app.use(express.urlencoded({extended: false}))

app.get('/', function (req, res) {
    db.collection('posts').find().toArray((err, posts)=> {
        
        res.send(`
            <!DOCTYPE html>
        <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-v4-rtl/4.6.0-2/css/bootstrap.min.css" integrity="sha512-hugT+JEQi0vXZbvspjv4x2M7ONBvsLR9IFTEQAYoUsmk7s1rRc2u7I6b4xa14af/wZ+Nw7Aspf3CtAfUOGyflA==" crossorigin="anonymous" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
                    <title>Bloggy</title>
                </head>
                <body class="bg-dark text-white">
                    <div class="container">
                        <header class="p-2">
                            <nav class="d-flex justify-content-between">
                                <div class="image p-2">
                                    <h6>blog</h6>
                                </div>
                                <div class="d-flex">
                                    <a class="text-white p-2 mx-5" href="#"><h5>Home</h5></a>
                                    <button class="btn btn-sm btn-warning text-white" type="button" data-bs-toggle="modal" data-bs-target="#create">CREATE NEW POST</button>
                                </div>
                            </nav>
                        </header>
                        <section>
                            <h3 class="text-center mt-5">My Blog</h3>
                            <p class="p-2 mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque tempora ipsam inventore voluptate tempore ad libero? Cumque dolorem voluptatibus doloremque!</p>
                            <div id="posts">
                                
                            </div>
                        </section>

                        <div class="modal text-dark" id="create">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Create a new post</h5>
                                        <button class="btn-close" data-bs-dismiss="modal">X</button>
                                    </div>
                                    <div class="modal-body">
                                        <form  class="form" action="/create" method="post">
                                            <label for="">Title of Post</label>
                                            <input type="text" class="form-control title" name="title" required>
                                            <label for="">Description of Post</label>
                                            <input type="text" class="form-control description" name="description" required>
                                            <label for="">Category of Post</label>
                                            <input type="text" class="form-control category" name="category"  required>
                                            <label for="">Date of post</label>
                                            <input type="date" class="form-control date" name="date" required>
                                            <div class="input-group">
                                            <label for="" class="input-group-text">Image</label>
                                            <input type="file" class="form-control" name="image">
                                            </div>
                                        

                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button class="btn btn-primary" type="submit" name="submit">Add Post</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="modal text-dark" id="edit">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Edit post</h5>
                                        <button class="btn-close" data-bs-dismiss="modal">X</button>
                                    </div>
                                    <div class="modal-body">
                                        <form  id="form" action="/edit" method="post">
                                            <label for="">Title of Post</label>
                                            <input type="text" class="form-control title" name="title" required>
                                            <label for="">Description of Post</label>
                                            <input type="text" class="form-control description" name="description" required>
                                            <label for="">Category of Post</label>
                                            <input type="text" class="form-control category" name="category"  required>
                                            <label for="">Date of post</label>
                                            <input type="date" class="form-control date" name="date" required>
                                            <div class="input-group">
                                            <label for="" class="input-group-text">Image</label>
                                            <input type="file" class="form-control" name="image">
                                            </div>
                                        

                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button class="btn btn-primary" type="submit" name="submit">Edit Post</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
                    <script>
                        let posts = ${JSON.stringify(posts)}
                    </script>
                    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
                    <script src="render.js"></script>
                    
            </body>
        </html>
        `)
    })
       
})
app.post('/create', (req, res) => {
    let safeTitle = sanitizeHTML(req.body.title, {allowedTags: [], allowedAttributes: {}})
    let safeDescription = sanitizeHTML(req.body.description, {allowedTags: [], allowedAttributes: {}})
    let safeCategory = sanitizeHTML(req.body.category, {allowedTags: [], allowedAttributes: {}})
    let safeDate = sanitizeHTML(req.body.date, {allowedTags: [], allowedAttributes: {}})
    db.collection('posts').insertOne({title: safeTitle, description: safeDescription, category: safeCategory, date: safeDate}, (err, info) => {
        res.json(info.ops[0])
    })
})

app.post('/edit', (req, res) => {
    let safeTitle = sanitizeHTML(req.body.title, {allowedTags: [], allowedAttributes: {}})
    let safeDescription = sanitizeHTML(req.body.description, {allowedTags: [], allowedAttributes: {}})
    let safeCategory = sanitizeHTML(req.body.category, {allowedTags: [], allowedAttributes: {}})
    let safeDate = sanitizeHTML(req.body.date, {allowedTags: [], allowedAttributes: {}})

    db.collection('posts').findOneAndUpdate({_id: new mongodb.ObjectId(req.body.id)}, {$set: {title: safeTitle, category:safeCategory, description: safeDescription, date: safeDate}}, () => {
        res.send("edited")
       
    })
})

app.post('/delete', (req, res) => {
    db.collection('posts').deleteOne({_id: new mongodb.ObjectId(req.body.id)}, () => {
        res.send("deleted")
    })
})




// app.listen(`${port}`)