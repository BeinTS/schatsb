const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


require('dotenv').config();
const mongoose = require('mongoose');
const Message = require('./messages.model');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', (err) => {
    console.error(err);
});
db.once('open', () => {
    console.log('MongoDB connection established successfully');
});

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

app.get('/messages', (req, res) => {
    Message.find()
        .then(messages => res.json(messages))
        .catch(err => res.status(400).json(err));
})

io.on('connection', (socket) => {
    console.log('A user connected');
    io.emit('message', {type: 'notification', text: 'a user connected'});
    let newMessage = new Message({
        type: 'notification',
        text: 'a user connected'
    });
    newMessage.save()
        .then(() => {console.log('new message saved.')})
        .catch(err => { console.log(err) });
    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('message', {type: 'notification', text: 'a user connected'});
        let newMessage = new Message({
            type: 'notification',
            text: 'a user disconnected'
        });
        newMessage.save()
            .then(() => {console.log('new message saved.')})
            .catch(err => { console.log(err) });
    });
    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', message);
        let newMessage = new Message({
            type: message.type,
            text: message.text
        });
        newMessage.save()
            .then(() => {console.log('new message saved.')})
            .catch(err => { console.log(err) });
    })
});

http.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})