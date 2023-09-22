
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

async function populateGroupList() {
  const groupList = document.getElementById('group-list');
  const groupO = await fetchData(); // Await the asynchronous function

  // Clear the existing list
  groupList.innerHTML = '';

  // Populate the list with fetched groups
  groupO.groupNames.forEach(name => {
    const listItem = document.createElement('li');
    listItem.textContent = name;
    // Add click event listeners to join groups here, if needed
    groupList.appendChild(listItem);
  });
}

// Add event listener for the Create Group button
const createGroupButton = document.getElementById('create-group-button');

createGroupButton.addEventListener('click', () => {
  // Implement your logic to create a new group here
  alert('Create Group button clicked.');
});

// Initial population of the group list
populateGroupList();


//chat-section

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
