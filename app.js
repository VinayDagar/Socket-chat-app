const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app)

const io = require('socket.io')(http)

const port = process.env.PORT || 3000

app.use('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
})

http.listen(port, () => {
    console.log('I\'m listining....')
})
io.on('connection', (socket) => {
    console.log('Some one is connected',socket.id)

    socket.on('Created', data =>{
        socket.broadcast.emit('Created', data)
    })

    socket.on('chatMeassage', data =>{
        socket.broadcast.emit('chatMeassage', data)
    })
    socket.on('typing' , data =>{
        socket.broadcast.emit('typing', data)
    })
    socket.on('stopTyping' , data =>{
        socket.broadcast.emit('stopTyping', data)
    })
    socket.on('disconnect', ()=>{
        console.log('Disconnected')
    })
})