const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const hbs = require('express-handlebars')
const io = new Server(server)
const path = require('path')
const Chat = require('./models/chat')
const mongoose = require('mongoose')

app.use(express.static(path.join(__dirname, 'public')))
// app.use('/views', express.static(path.join(__dirname, 'views')))
app.engine('hbs', hbs.engine({ defaultLayout: 'main',extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

mongoose.connect('mongodb://localhost:27017/tieuluan', (err, db) => {
    if(err) throw err

    io.on('connection', (socket) => {
        Chat.find((err, messages) => {
            if(err) throw err

            // Emit messages
            socket.emit('output', messages)
        }).limit(100)

        socket.on('input', (data) => {
            let name = data.name
            let message = data.message
    
            const newChat = Chat({
                name: name,
                message: message,
            })
    
            newChat.save((err, chat) => {
                if(err) throw err
                // console.log(chat)
                io.emit('newchat', chat)
            })
    
            // console.log(data)
        })
    })

})


app.get('/', (req, res) => {
    res.render('index')
})




server.listen(5000, ()=>{
    console.log('http://localhost:5000')
})