const Post = require('../model/Posts')
// const mongodb = require('mongodb')
exports.createPage = function (req, res) {
    res.render('create-post')
}

exports.login = function (req, res) {
    res.render('login')
}

exports.register = function (req, res) {
    res.render('register')
}

exports.create = function (req, res) {
    let post = new Post.postFunc(req.body)
    
    post.create().then(() => { 
        req.session.post = {postTitle: post.post.title}
        req.flash('message', 'New Post Created Succesfully')
       
        req.session.save(function () {
             res.redirect('/')
        })
    }).catch((e)=> {
        console.log(e)
    })
    
}

exports.delete = function (req, res) {
    
    let post = new Post.postFunc(req.body)
    
    post.delete(req.body.deleteId).then(() => { 
        // req.session.post = {postDeleted: post.post.deleteId}
        req.flash('message', 'Post Deleted Succesfully')
    //    res.send("done")
        req.session.save(function () {
            res.redirect('/')
       })
    
    }).catch((e)=> {
        console.log(e)
    })
    
}

exports.edit = function (req, res) {
    let post = new Post.postFunc(req.body)
    post.edit(req.body).then(() => {
        req.flash('message', 'Post edited successfully')
        req.session.save(function () {
          res.redirect('/')  
        })
    }).catch((e) => {
        console.log(e);
    })
}

exports.home = function (req, res) {   
    Post.postRender().then((posts) => {
        res.render('home', {posts: posts, postMessage: req.flash('message')})
    }).catch((errors)=>{
        errors.forEach(error => {
            req.flash('error', error)
        })
    })
        
}

