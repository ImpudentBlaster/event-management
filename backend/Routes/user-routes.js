const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')

router.post('/signup' , userController.addUser)
router.post('/login' , userController.login)
router.get('/showUser' , userController.showUser)
router.get('/findUser/:email' , userController.findUser)

module.exports = router