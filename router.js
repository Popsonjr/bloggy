const express = require('express')
const router = express.Router()
const postController = require("./controller/postController")

router.get('/', postController.home)
router.get('/create',postController.createPage)
router.post('/create', postController.create)
router.post('/delete', postController.delete)
router.post('/edit', postController.edit)
router.get('/login-page', postController.login)
router.get('/register-page', postController.register)

module.exports = router
