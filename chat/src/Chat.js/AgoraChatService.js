import AC from 'agora-chat'; // Import Agora Chat SDK

const appKey = '611182499#1369575'; // Your Agora app key

// Create a connection instance
const connection = new AC.connection({
  appKey: appKey,
});

// Function to login the user

export const loginToChat = (userId, token) => {
  return new Promise((resolve, reject) => {
    connection.open({
      user: userId,
      agoraToken: token,
    }).then(() => {
      console.log(`Logged in successfully with user ID: ${userId}`);
      resolve();
    }).catch((error) => {
      console.error(`Login failed for user ID: ${userId}`, error);
      reject(error);
    });
  });
};

export const sendMessage = (options) => {
  const msg = AC.message.create(options);
  return connection.send(msg).then((response) => {
    console.log('Message sent successfully', response);
    return response;
  }).catch((error) => {
    console.error('Error sending message:', error);
    throw error;
  });
};

// Export connection for use in components if needed
export { connection };
