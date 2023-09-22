
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
    return { groupNames: [], groupUsecases: [] }; // Return an empty object in case of an error
  }
}

// Fetch data and store it in groupO
async function fetchData() {
  const groupO = await fetchExistingGroups();
  console.log('Fetched data:', groupO);
  return groupO;
}
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

    console.log(data); // For debugging purposes
  } catch (error) {
    console.error('Error:', error);
  }
}

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
    listItem.addEventListener('click', () => {
      // Clear the chat messages or fetch and display messages for the selected group
      // Update the chat banner with the selected group's name
      alert('client clicked chat banner group');
    const chatBanner = document.querySelector('.chatbanner h2 .left-content');
    chatBanner.textContent = name;
    //update right
    showGroupUse(name);

      // Implement your logic to fetch and display messages for the selected group
      // You can make an AJAX request to your server here

      // Example: Fetch and display messages for the selected group
    fetchMessagesForGroup(name);
    });

    // // Append the list item to the group list
    // groupList.appendChild(listItem);
  });

}


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
    body: JSON.stringify(chatData), // Replace data with your request body
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json', // Specify the Content-Type header
    },
  }).then(response => {
      if (!response.ok) {
        console.log('Network response was not ok');
      }
      console.log(response.json()); // Parse the JSON response
    })
    .catch(error => {
      console.error('Error:', error);
    });
  createGroupForm.style.display = 'none';
});

const aianalyzer = document.getElementById('ai-analyzer-button');
aianalyzer.addEventListener('click', () => {
  //logic
  alert("Analyzer clicked");
});
// Initial population of the group list
populateGroupList();
//create new group




//chat-section
async function showGroupUse(group) {
  try {
    const url='http://localhost:8000/api/groups/'.concat(group);
    const response = await fetch(url); // Make a GET request to your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Parse the JSON response
    const chatBanner = document.querySelector('.chatbanner h2 .right-content');

    chatBanner.textContent=data.usecase;

    console.log(data); // Return the fetched data
  } catch (error) {
    console.error('Error:', error);};
}
showGroupUse('Asjad');

const sendForm = document.getElementById('send-cont');

sendForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const sendip = document.getElementById('sendip').value;
  var senderUserId='A';
  var receiverUserId='B';
  var currentGroupName='Asjad';
  console.log(sendip);

  // Assuming you have variables for sender, receiver, and groupName
  const messageData = {
    sender: senderUserId,
    receiver: receiverUserId,
    groupName: currentGroupName,
    text: sendip,
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
