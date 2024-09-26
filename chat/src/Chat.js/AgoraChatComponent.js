import React, { useEffect, useState } from 'react';
import AC from "agora-chat"

// Replace with your Agora app key.
const appKey = '611182499#1369575';

// Hardcoded list of users for demonstration
const userList = [
  { id: 'rajesh1234', name: 'Alice' },
  { id: 'user2', name: 'Bob' },
  { id: 'user3', name: 'Charlie' },
  { id: 'user4', name: 'David' },
];

const AgoraChatComponent = () => {
  const [conn, setConn] = useState(null);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('007eJxTYHByORVqsp7tALuP4+xv2x+vzc4OsOBkVi13D5UM0F4gV6/AYJpoZm6eYmaQlJZqYGJomGJpYplknGKelJxmlpxsbGpicuxSWkMgI8OsDUtYGRlYGRiBEMRXYUhMSzQ1MzIz0DU1S0nWNTRMTdO1SDRL0k0yTDUzt0xLSjJIMwYAO8QlVw==');
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [logs, setLogs] = useState([]);

  // Initialize the Agora Chat connection
  useEffect(() => {
    const connection = new AC.connection({
      appKey: appKey,
    });

    connection.addEventHandler('connection&message', {
      onConnected: () => addLog('Connect success!'),
      onDisconnected: () => addLog('Logout success!'),
      onTextMessage: (message) => handleIncomingMessage(message),
      onTokenWillExpire: () => addLog('Token is about to expire'),
      onTokenExpired: () => addLog('The token has expired'),
      onError: (error) => console.error('on error', error),
    });

    setConn(connection);

    // Cleanup on component unmount
    return () => {
      if (connection) {
        connection.close();
      }
    };
  }, []);

  // Function to add logs
  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  // Function to handle incoming messages
  const handleIncomingMessage = (message) => {
    if (selectedUser && message.from === selectedUser.id) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: message.from, msg: message.msg, type: 'received' },
      ]);
    }
  };

  // Login function
  const handleLogin = () => {
    addLog('Logging in...');
    conn.open({
      user: userId,
      agoraToken: token,
    });
  };

  // Logout function
  const handleLogout = () => {
    if (conn) {
      conn.close();
      addLog('Logout');
    }
  };

  // Send message to the selected user
  const handleSendMessage = () => {
    if (!selectedUser || messageInput.trim() === '') return;

    const option = {
      chatType: 'singleChat', // Sets the chat type as single chat.
      type: 'txt', // Sets the message type.
      to: selectedUser.id, // Sets the recipient of the message with user ID.
      msg: messageInput, // Sets the message content.
    };

    const msg = AC.message.create(option);
    conn
      .send(msg)
      .then(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { from: userId, msg: messageInput, type: 'sent' },
        ]);
        setMessageInput('');
        addLog(`Message sent to: ${selectedUser.name} Message: ${messageInput}`);
      })
      .catch(() => console.error('Failed to send private text message'));
  };

  // Handle selecting a new user for chat
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessages([]); // Reset messages for the new user
    addLog(`Switched conversation to: ${user.name}`);
  };

  return (
    <div>
      <h2>Agora Chat</h2>
      <div>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button id="login" onClick={handleLogin}>
          Login
        </button>
        <button id="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={{ display: 'flex', marginTop: '20px' }}>
        {/* User List */}
        <div style={{ width: '30%', borderRight: '1px solid #ddd', paddingRight: '10px' }}>
          <h3>User List</h3>
          <ul>
            {userList.map((user) => (
              <li key={user.id}>
                <button onClick={() => handleSelectUser(user)}>
                  {user.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div style={{ width: '70%', paddingLeft: '10px' }}>
          <h3>Chat with {selectedUser ? selectedUser.name : '...'}</h3>
          <div id="chat-log" style={{ border: '1px solid #ddd', padding: '10px', minHeight: '200px', overflowY: 'scroll' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.type === 'sent' ? 'right' : 'left' }}>
                <b>{msg.type === 'sent' ? 'Me' : selectedUser.name}:</b> {msg.msg}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>

      {/* Log display */}
      <div id="log">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default AgoraChatComponent;