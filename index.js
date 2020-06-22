const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

app.get('/app.js', (req, res) => {
    res.sendFile(__dirname+'/app.js');
});

app.get('/app.css', (req, res) => {
    res.sendFile(__dirname+'/app.css');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    io.emit('msg', ['notification', 'a user connected']);
    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('msg', ['notification', 'a user disconnected']);
    });
    socket.on('msg', (msg) => {
        console.log(msg);
        io.emit('msg', msg);
    })
});

http.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})