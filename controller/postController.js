const Post = require('../model/Posts')
// const mongodb = require('mongodb')


exports.login = function (req, res) {
    if (req.session.user) {
        res.redirect('/create')
    } else {
        res.render('login', {message: req.flash('errors')})
    }
    
        
}

exports.register = function (req, res) {
    if (req.session.user) {
        res.render('register', {message: req.flash('errors')})
    } else {
        res.render('register', {message: req.flash('errors')})
    }
}

exports.create = function (req, res) {
    let post = new Post.postFunc(req.body)
    
    post.create().then(() => { 
        req.session.user = {user: req.body.username, postTitle: post.post.title}
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

