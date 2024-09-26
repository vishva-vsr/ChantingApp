import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./chatarea.css";

function Chatarea({ selectedChat, onChatUpdate }) {
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const messageAreaRef = useRef(null);

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages || []);
      scrollToBottom();
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  // Fetch more messages for infinite scrolling
  const fetchMoreMessages = () => {
    if (messages.length >= 50) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      const moreMessages = Array.from({ length: 10 }).map((_, index) => ({
        text: `Older message ${messages.length + index + 1}`,
        type: "received",
        sender: selectedChat?.name,
      }));

      setMessages((prevMessages) => [...moreMessages, ...prevMessages]);
      if (messageAreaRef.current) {
        messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
      }
    }, 1000);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() && selectedChat && selectedChat.id) {
      const newMessage = { text: inputValue, type: "sent", sender: "Me" };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const updatedChat = {
        ...selectedChat,
        messages: [...(selectedChat.messages || []), newMessage],
      };
      onChatUpdate(updatedChat);

      setInputValue("");
      scrollToBottom();
    } else {
      console.error('No chat selected or invalid chat userID');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  };

  if (!selectedChat) {
    return <div className="empty-chat-area">Please select a chat to start messaging.</div>;
  }

  return (
    <div className="chat-container d-flex flex-column">
      <div
        ref={messageAreaRef}
        className="message-area flex-grow-1"
        id="scrollableDiv"
        style={{ height: '569px', overflowY: 'auto' }}
      >
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMoreMessages}
          hasMore={hasMore}
          inverse={true}
          scrollableTarget="scrollableDiv"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-container d-flex align-items-center ${
                message.type === "sent" ? "message-sent" : "message-received"
              }`}
            >
              <div className="avatar me-2">
                <div className="avatar-placeholder rounded-circle d-flex align-items-center justify-content-center">
                  {message.type === "sent" ? (
                    <span className="text-muted">
                      {"Me".charAt(0)}
                    </span>
                  ) : (
                    <img
                      src={selectedChat.img}
                      alt={selectedChat.name}
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px' }}
                    />
                  )}
                </div>
              </div>
              <div className="message-content">
                {message.text}
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>

      <div className="row mt-auto" id="chat-box">
        <div className="col-11">
          <input
            className="border border-1"
            type="text"
            id="msg-bar"
            placeholder="       message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="col-1">
          <button className="btn-send" onClick={handleSendMessage}>
            <i className="bi bi-send-fill text-white"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatarea;
