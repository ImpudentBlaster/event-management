const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const port = 5000;
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./Routes/user-routes')
const jwtAuthMiddleware = require('./Middleware/AuthMiddleware')
const eventRoutes = require('./Routes/event-routes')

const corsOption = {
    origin: "http://localhost:3000",
    credentials: true
}

app.get('/', (req, res) => {
    res.send('Home')
})
app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())
app.use('/', userRoutes)
app.use('/', eventRoutes)
mongoose.connect('mongodb+srv://sagarsharmatechies:sagarsharmatechies@democluster.dlxyrkz.mongodb.net/Assignment')
    .then(
        app.listen(port, (req, res) => {
            console.log('server is live at http://localhost:5000')
        })
    ).catch(err => console.log(err))
