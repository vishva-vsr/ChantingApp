import React, { useEffect, useState } from "react";
import "./Chatwindow.css";
import { Input } from "antd";
import { ChatData } from "./Chatdata";
import InfiniteScroll from "react-infinite-scroll-component";
import NewChat from "./NewChat";
import Chatarea from "./Chatarea";

const { Search } = Input;

const Chatwindow = () => {
  const [items, setItems] = useState(ChatData.slice(0, 10)); // Initial items
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [addedChats, setAddedChats] = useState([]); // Track added chats
  const [selectedChat, setSelectedChat] = useState(null); // Track the selected chat

  useEffect(() => {
    if (selectedChat) {
      console.log('Chat selected:', selectedChat);
    }
  }, [selectedChat]);

  const fetchMoreData = () => {
    if (items.length >= ChatData.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...ChatData.slice(prevItems.length, prevItems.length + 10),
      ]);
    }, 1000);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredItems = ChatData.filter((chat) =>
      chat.name.toLowerCase().includes(value)
    );

    setItems(filteredItems);
  };

  const handleAddChat = (newChat) => {
    setItems((prevItems) => [newChat, ...prevItems]);
    setAddedChats((prevChats) => [...prevChats, newChat]);
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);  // Corrected: Only set the state once
  };

  const handleChatUpdate = (updatedChat) => {
    setSelectedChat(updatedChat);
    setItems((prevItems) => {
      return prevItems.map((item) => 
        item.id === updatedChat.id ? updatedChat : item
      );
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className="row">
        <div className="col-3" id="chat-bar">
          <div className="row p-2 align-items-center">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <Search
                placeholder="Search chats"
                value={searchTerm}
                onChange={handleSearch}
                style={{
                  width: 'calc(100% - 50px)',
                }}
              />
              <NewChat onAddChat={handleAddChat} existingChats={addedChats} />
            </div>
          </div>

          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            endMessage={<p style={{ textAlign: "center" }}>No more messages</p>}
          >
            <div className="col">
              {items.map((chat, index) => (
                <div key={index} className="col-12 mb-2">
                  <div
                    className={`p-2 border border-0 ms-3 rounded-start-2 ${selectedChat === chat ? 'active-chat' : ''}`}
                    id="hov-chat"
                    onClick={() => handleSelectChat(chat)} 
                  >
                    <div className="d-flex align-items-center">
                      <div className="avatar me-3">
                        <div className="avatar-placeholder rounded-circle d-flex align-items-center justify-content-center">
                          {chat.img ? (
                            <img
                              src={chat.img}
                              alt={chat.name}
                              className="rounded-circle"
                              style={{ width: '40px', height: '40px' }}
                            />
                          ) : (
                            <span className="text-muted">{chat.name.charAt(0)}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{chat.name}</h6>
                        <div className="d-flex justify-content-between">
                          <small className="text-muted">
                            {chat.messages && chat.messages.length > 0
                              ? chat.messages[chat.messages.length - 1].text
                              : 'No messages'}
                          </small>
                          <small className="text-muted">
                            {chat.messages && chat.messages.length > 0
                              ? formatTime(chat.messages[chat.messages.length - 1].timestamp)
                              : ''}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col">
              <Chatarea selectedChat={selectedChat} onChatUpdate={handleChatUpdate} />  
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatwindow;
