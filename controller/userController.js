const User = require('../model/Users')

exports.login = function (req, res) {
    let user = new User(req.body)
    user.login().then(() => {
        req.session.user = {user: req.body.username}
        req.session.save(function () {
            res.redirect('/create')
        })
        
    }).catch((e) => {
        req.flash('errors', e)
        req.session.save(function () {
           res.render('login', {message: req.flash('errors')}) 
        })
    })
}

exports.logout = function (req, res) {
    req.session.destroy(function () {
        res.redirect('/')
    })
}

exports.register = function (req, res) {
    let user = new User(req.body)
    user.register().then(()=> {
        req.session.user = {user: req.body.username}
        req.flash('message', 'Account created successfully')
        req.session.save(function () {
           res.render('login', {message: req.flash('message'), username: req.session.user.user})
        })
        
    }).catch((errors)=>{
        errors.forEach(error => {
            req.flash("errors", error)
            req.session.save(function () {
                res.render('register', {message: req.flash('errors')})
            })
        })
    })
}
exports.createPage = function (req, res) {
    if (req.session.user) {
        res.render('create-post', {username: req.session.username})
    } else {
        res.render('register', {message: req.flash('errors')})
    }
    
}