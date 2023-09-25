const moment = require('moment');

function createWelcomeMessage() {
  const username = 'ChatLytics Bot';
  const features = [
    'Real-time Chat',
    'Create New Chats (Find all Existing Room)',
    'AI Analyzer Integration',
    'Leave Chat Rooms',
    'Conversational Analytics',
    'User-Friendly Interface',
    'Join New Room and Back to Your Previous Chat'
  ];
  
  const featureList = features.map(feature => `• ${feature}`).join('\n');
  const welcomeMessage = {
    username,
    text: `Welcome to ChatLytics!\n\nHere are some of the features you can enjoy:\n\n${featureList}`,
    time: moment().format('h:mm a'),
  };
  return welcomeMessage;
}

const WelcomeM = createWelcomeMessage();

module.exports=WelcomeM;