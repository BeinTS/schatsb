const socket = io();
const input = document.querySelector('.msg-input');
const send = document.querySelector('.send-btn');

const loginPage = document.querySelector('.login');
const chatPage = document.querySelector('.chat');
const messagesView = document.querySelector('.messages');
let user = '';

// Login logic
const pin = document.querySelector('.pin-input');
const loginButton = document.querySelector('.login-btn');
loginButton.addEventListener('click', () => {
    console.log(pin.value);
    if(pin.value == '5555'){
        socket.emit('message', {type:'notification', text: 's joined chat'});
        loginPage.style.display = 'none';
        chatPage.style.display = 'flex';
    }
    if(pin.value == '55555'){
        socket.emit('message', {type:'notification', text: 'b joined chat'});
        loginPage.style.display = 'none';
        chatPage.style.display = 'flex';
    }
})


/////////////

/// delete logic

//////////////

fetch('/messages')
    .then(response => response.json())
    .then(messages => {
        messages.forEach(message => {
            const messageDiv = document.createElement('div');
            if(message.type == 'sannu'){
                messageDiv.classList.add('s-msg');
            }
            if(message.type == 'bharat'){
                messageDiv.classList.add('b-msg');
            }
            if(message.type == 'notification'){
                messageDiv.classList.add('notification');
            }
            messagesView.appendChild(messageDiv);
            messageDiv.innerText = message.text;
        });
    })
    .catch(err => console.log(err));
console.log(input, send);




send.addEventListener('click', () => {
    socket.emit('message', {type: user, text: input.value});
    input.value = '';
    return false;
});

socket.on('message', (message) => {
    console.log(message);
    if(message.type != ''){
        const messageDiv = document.createElement('div');
        if(message.type == 'sannu'){
            messageDiv.classList.add('s-msg');
        }
        if(message.type == 'bharat'){
            messageDiv.classList.add('b-msg');
        }
        if(message.type == 'notification'){
            messageDiv.classList.add('notification');
        }
        messagesView.appendChild(messageDiv);
        messageDiv.innerText = message.text;
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


/// delete logic

//////////////
