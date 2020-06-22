const socket = io();
const input = document.querySelector('input');
const send = document.querySelector('button');
const messagesView = document.querySelector('.messages');
const messages = [];
console.log(input, send);

messages.forEach(message => {
    const messageDiv = document.createElement('div');
    messagesView.appendChild(messageDiv);
    messageDiv.innerText = message;
});


send.addEventListener('click', () => {
    socket.emit('msg', input.value);
    input.value = '';
    return false;
});

socket.on('msg', (msg) => {
    console.log(msg);
    messages.push(msg);
    const messageDiv = document.createElement('div');
    messagesView.appendChild(messageDiv);
    messageDiv.innerText = msg;
})