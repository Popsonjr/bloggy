const express = require('express')
const router = express.Router()
const postController = require("./controller/postController")
const userController = require('./controller/userController')

router.get('/', postController.home)
router.get('/create',userController.createPage)
router.post('/create', postController.create)
router.post('/delete', postController.delete)
router.post('/edit', postController.edit)
router.get('/login-page', postController.login)
router.get('/register-page', postController.register)
router.post('/login-page', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)


module.exports = router
