const express = require('express')
const router = express.Router()
const eventController = require('../Controllers/eventController')

router.post('/createEvent' , eventController.createEvent)
router.get('/showEvent' ,eventController.showEvent)
router.post('/deleteEvent/:id' ,eventController.deleteEvent)
router.post('/updateEvent/:id' , eventController.updateEvent)

module.exports = router