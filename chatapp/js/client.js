const socket = io('http://localhost:8000');
const form = document.getElementById('send-cont');
const mesip = document.getElementById('sendip');
const messagecontainer = document.querySelector('.chat');

var audio = new Audio('ting.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(position);

    const avatarElement = document.createElement('div');
    avatarElement.classList.add(position + '-avatar');

    const messageText = document.createElement('p');
    messageText.innerText = message;

    messageElement.appendChild(avatarElement);
    messageElement.appendChild(messageText);

    messagecontainer.appendChild(messageElement);
    // Scroll to the latest message
    messagecontainer.scrollTop = messagecontainer.scrollHeight;
    if (position == 'receiver') {
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = mesip.value.trim(); // Trim whitespace from the input

    if (message !== '') {
        append(`you: ${message}`, 'sender');
        // Replace 'selectedGroup' with the actual group or room name
        const selectedGroup = 'Asjad'; // Replace with the actual group ID
        //Emit Message to Srver
        socket.emit('sendMessage', { room: selectedGroup, message });
        // Listen for incoming messages in the specific group or room
        socket.on('receiveMessage', ({ message }) => {
            append(`New Data: ${message}`, 'receiver');
        });
        mesip.value = '';
    } else {
        // Display an alert or error message indicating that the input is blank
        alert('Please write something');
    }
});

const uname = prompt('Enter your name to join:');
//new user
socket.emit('new_user', uname);
socket.on('user_joined', ({ uname }) => {
    append(`${uname} joined the chat`, 'receiver');
});




socket.on('newm',);
socket.on('left',);