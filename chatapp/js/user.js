const socket = io("http://localhost:8000");
const sendForm = document.getElementById('send-cont');
const mesip = document.getElementById('sendip');
const messagecontainer = document.querySelector('.chat');

var audio = new Audio('ting.mp3');
const appendMessage = (username, text, time, position) => {
  // Create a message element
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(position);

  // Create a timestamp and username element container
  const topRow = document.createElement('div');
  topRow.classList.add('top-row');
  topRow.style.border = '1px solid #ccc'; // You can adjust the color and width as needed
  topRow.style.borderRadius = '5px'
  topRow.style.padding = '5px'
  topRow.style.marginRight = '5px'
  topRow.style.zIndex='10'

  // Create a timestamp element
  const timestampElement = document.createElement('span');
  timestampElement.classList.add('timestamp');
  timestampElement.innerText = time;
  timestampElement.style.fontSize = '10px';
  timestampElement.style.webkitTextStrokeColor = 'red';

  // Create a username element
  const usernameElement = document.createElement('span');
  usernameElement.classList.add('username');
  usernameElement.innerText = username;
  usernameElement.style.fontSize = '14px'; 
  timestampElement.style.color = 'black';
  usernameElement.style.marginRight = '5px'

  // Create a message text element
  const messageText = document.createElement('p');
  messageText.innerText = text;

  // Create an avatar element
  const avatarElement = document.createElement('div');
  avatarElement.classList.add(position + '-avatar');

  // Add some margin between elements
  messageText.style.marginTop = '4px';

  // Append elements to the top row container
  topRow.appendChild(usernameElement);
  topRow.appendChild(timestampElement);

  // Append the top row container and message text to the message element
  messageElement.appendChild(topRow);
  messageElement.appendChild(messageText);

  // Append the avatar element (if needed)
  if (position === 'receiver') {
    messageElement.appendChild(avatarElement);
  }

  // Append the message element to the message container
  messagecontainer.appendChild(messageElement);

  // Scroll to the latest message
  messagecontainer.scrollTop = messagecontainer.scrollHeight;

  // Play audio for incoming messages
  if (position === 'receiver') {
    audio.play();
  }
}




// Function to fetch existing group data from the API
async function fetchExistingGroups() {
  try {
    const response = await fetch('http://localhost:8000/api/groups'); // Make a GET request to your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Parse the JSON response
    return data; // Return the fetched data
  } catch (error) {
    console.error('Error:', error);
    return { groupNames: [], groupUsecases: [] }; 
  }
}

// Fetch data and store it in groupO
async function fetchData() {
  const groupO = await fetchExistingGroups();
  console.log('Fetched data:', groupO);
  return groupO;
}

//fetach chat data
async function fetchMessagesForGroup(groupName) {
  try {
    // Make an AJAX request to fetch messages for the selected group
    const response = await fetch(`http://localhost:8000/api/messages?group=${groupName}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Display the fetched messages in the chat section
    const chatSection = document.querySelector('.chat-section');
    // Implement your logic to display messages in the chat section
    console.log(data.text); 
  } catch (error) {
    console.error('Error:', error);
  }
}
//URL MANAGEMENT
// Get the current URL parameters
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
let room = urlParams.get('room');
console.log(room+username);
let newRoomName;
// Function to update the URL with new room
function updateURL(roomName) {
  const newURL = `${window.location.origin}${window.location.pathname}?username=${username}&room=${roomName}`;
  window.history.pushState({ path: newURL }, '', newURL);
}

// Listen for changes to the URL
window.addEventListener('popstate', (event) => {
  // Handle URL changes here
  const newURLParams = new URLSearchParams(window.location.search);
  const newRoom = newURLParams.get('room');
  
  if (newRoom !== room) {
    // Room has changed, perform actions accordingly
    updateURL(newRoom);
  }
});


async function populateGroupList() {
  const groupList = document.getElementById('group-list');
  const groupO = await fetchData(); // Await the asynchronous function

  // Clear the existing list
  groupList.innerHTML = '';

  // Populate the list with fetched groups
  groupO.groupNames.forEach(name => {
    const listItem = document.createElement('li');
    listItem.textContent = name;
    // Assign an id based on the group name
    listItem.id = `group-${name}`;
    // Add click event listeners to join groups here, if needed
    groupList.appendChild(listItem);
     // Add a click event listener for each group name
    listItem.addEventListener('click', (event) => {
      newRoomName = event.target.textContent
      console.log("Romm clicked:"+newRoomName);
      alert('client clicked chat banner group');
      updateURL(newRoomName);
      const chatBanner = document.querySelector('.chatbanner h2 .left-content');
    //create Room
      chatBanner.textContent = newRoomName;
    //update right
      showGroupUse(newRoomName);
      // Join chatroomn
      socket.emit('joinRoom', { username, room:newRoomName});
      console.log("Room joined:"+newRoomName);
      fetchMessagesForGroup(newRoomName);
    });
  });

}

//form for craete group
const createGroupButton = document.getElementById('create-group-button');
const createGroupForm = document.getElementById('create-group-form');
const newChatForm = document.getElementById('new-chat-form');

createGroupButton.addEventListener('click', () => {
  createGroupForm.style.display = 'block';
});

document.getElementById('cancel-button').addEventListener('click', () => {
  createGroupForm.style.display = 'none';
});

newChatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const chatName = document.getElementById('chat-name').value;
  const chatUsecase = document.getElementById('chat-usecase').value;
  const chatData = {
    "name": chatName,
    "usecase": chatUsecase
  };
  await fetch('http://localhost:8000/api/newgroups/', {
    method: 'POST',
    body: JSON.stringify(chatData),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json', 
    },
  }).then(response => {
      if (!response.ok) {
        console.log('Network response was not ok');
      }
      console.log(response.json()); 
    })
    .catch(error => {
      console.error('Error:', error);
    });
  createGroupForm.style.display = 'none';
    refreshCurrentTab();
});

//AI ANALYZER -
const aianalyzer = document.getElementById('ai-analyzer-button');
aianalyzer.addEventListener('click', () => {
  //logic
  alert("Analyzer clicked");
});

// Initial population of the group list
populateGroupList();

//chat-section
async function showGroupUse(group) {
  try {
    const url='http://localhost:8000/api/groups/'.concat(group);
    const response = await fetch(url); 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const chatBanner = document.querySelector('.chatbanner h2 .right-content');
    chatBanner.textContent=data.usecase;
    console.log(data);
  } catch (error) {
    console.error('Error:', error);};
}
showGroupUse('Asjad');

//Submit Form of Chat Message
sendForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  //Store Message
  let sendip = mesip.value;
  //SEnd Message
  await FormChatListener();
  var senderUserId='A';
  var receiverUserId='B';
  var currentGroupName=newRoomName;
  console.log(sendip);
  // Assuming you have variables for sender, receiver, and groupName
  const messageData = {
    "sender": senderUserId,
    "receiver": receiverUserId,
    "groupName": currentGroupName,
    "text": sendip,
  };
  try {
    // Send the message asynchronously without waiting for a response
    fetch('http://localhost:8000/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    }).then(() => {
      console.log('Message sent asynchronously');
      // Clear the input field or update the UI as needed
    }).catch((error) => {
      console.error('Error:', error);
    });
  } catch (error) {
    console.error('Error:', error);
  }
});


async function FormChatListener(){
  let message = mesip.value.trim(); 
  if (message !== '') {
    //Send Message to the server
    socket.emit('sendMessage', { room: newRoomName, user:username,message });
    console.log("send in romm:"+newRoomName+",message:"+message+"user:"+username);
    mesip.value = '';
    // mesip.focus();
  } else {
        // Display an alert or error message indicating that the input is blank
    alert('Please write something');
  }
};

function refreshCurrentTab() {
  location.reload();
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    socket.emit('UserDisconnect',username);
    window.location = '../index.html';
  } else {
  }
});


// Listen for the 'botm' event
socket.on('botm', (message) => {
  // This event is for displaying a welcome message when you join a room
  console.log(message);
  const { username, text, time } = message;
  console.log(`Received message from ${username} at ${time}: ${text}`);
  appendMessage(username,text,time,'sender');
});


// Listen for the 'user_joined' event
socket.on('user_joined', (message) => {
  // This event is for notifying when a user joins the room
  const { username, text, time } = message;
  console.log(`Received message from ${username} at ${time}: ${text}`);
  appendMessage(username,text,time,'sender'); // Implement a function to append messages to your UI
});


socket.on('receiveMessage', (message) => {
  // Access the message properties
  const { username, text, time } = message;
  // Now, you can use these properties as needed
  console.log(`Received message from ${username} at ${time}: ${text}`);
  // Update your UI with the message details
  appendMessage(username, text,time,'receiver');
});


// Listen for the 'left' event
socket.on('left', (message) => {
  // Handle the event here
  appendMessage(message.username, message.text, message.time, 'receiver');
});



