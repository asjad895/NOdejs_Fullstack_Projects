const socket = io('http://localhost:8000');
const form = document.getElementById('send-cont');
const mesip = document.getElementById('sendip');
const messagecontainer = document.querySelector('.chat-section');


var audio=new Audio('ting.mp3');
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
    if(position=='receiver'){
        audio.play(); 
    }
 
  }

  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = mesip.value.trim(); // Trim whitespace from the input
    
    if (message !== '') {
      append(`you: ${message}`, 'sender');
      socket.emit('send', message);
      mesip.value = '';
    } else {
      // Display an alert or error message indicating that the input is blank
      alert('Please write something');
    }
  });
  
  

const name = prompt('Enter your name to join:');
socket.emit('new_user', name);

socket.on('user_joined', ({ name }) => {
  append(`${name} joined the chat`, 'receiver');
});

// recieve is event
socket.on('recieve', data => {
    append(`${data.name}: ${data.message}`, 'receiver');
    // console.log('aa gya');
  });
  