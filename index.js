const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('msg', (msg) => {
        console.log(msg);
        io.emit('msg', msg);
    })
});

http.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})