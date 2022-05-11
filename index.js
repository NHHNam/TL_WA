const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const hbs = require('express-handlebars')
const io = new Server(server)
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
// app.use('/views', express.static(path.join(__dirname, 'views')))
app.engine('hbs', hbs.engine({ defaultLayout: 'main',extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index')
})

io.on('connection', (socket) => {
    socket.on('chat', data =>{
        io.emit('user-chat', data)
    })

})

server.listen(3000, ()=>{
    console.log('http://localhost:3000')
})