const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const http = require('http').createServer(app)
const router = require('./router/mainRouter')
app.listen(4000)
console.log('server started on port 4000')
mongoose.connect('mongodb+srv://Atsiskaitymas:HEfL8EHsTF6axFrf@cluster0.yvjpeqb.mongodb.net/?retryWrites=true')
    .then(res => console.log('DB is ok'))
    .catch(e  => console.log(e));
app.use(cors({
    origin: true,
    credentials: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE"
}))
app.use(express.json())
app.use(session({
    secret: '<Zdfghjkuytrdfghj!@#$%^&*()512uyfvbnm>',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use('/', router)

// let users = []
// io.on('connect', socket => {
//     socket.on('login', async data => {
//         if (!users.find(x=>x.userID===data._id)) {
//             users.push({socketID: socket.id, userID:data._id})
//         }
        
//     })
//     socket.on('alert', data => {
//         console.log(data)
//         let user = users.find(x=>x.userID===data.id)
//         if (user) io.to(user.socketID).emit('alert', data.message)
//     })
   
// })