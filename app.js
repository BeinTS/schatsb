const socket = io();
const input = document.querySelector('input');
const send = document.querySelector('button');
const messagesView = document.querySelector('.messages');
let user = '';



const messages = [];
console.log(input, send);

messages.forEach(message => {
    const messageDiv = document.createElement('div');
    messagesView.appendChild(messageDiv);
    messageDiv.innerText = message;
});


send.addEventListener('click', () => {
    socket.emit('msg', [user, input.value]);
    input.value = '';
    return false;
});

socket.on('msg', (msg) => {
    console.log(msg);
    if(msg[0] != ''){
        messages.push(msg[1]);
        const messageDiv = document.createElement('div');
        if(msg[0] == 'sannu'){
            messageDiv.classList.add('s-msg');
        }
        if(msg[0] == 'bharat'){
            messageDiv.classList.add('b-msg');
        }
        if(msg[0] == 'notification'){
            messageDiv.classList.add('notification');
        }
        messagesView.appendChild(messageDiv);
        messageDiv.innerText = msg[1];
    }
});


// Selecting messager

const s = document.querySelector('.s');
const b = document.querySelector('.b');

s.addEventListener('click', () => {
    if(user == '' || user == 'bharat'){
        user = 'sannu';
        s.classList.add('messager');
        b.classList.remove('messager');
    } else{
        user = '';
        s.classList.remove('messager');
    }
    console.log(user);
});

b.addEventListener('click', () => {
    if(user == '' || user == 'sannu'){
        user = 'bharat';
        b.classList.add('messager');
        s.classList.remove('messager');
    } else{
        user = '';
        b.classList.remove('messager');
    }
    console.log(user);

});

