import React, { useState } from 'react';
import { Button, Popover, Divider, Input } from 'antd';
import { ChatData } from './Chatdata'; 
import './Newchat.css'; 
import { MessageTwoTone } from '@ant-design/icons';
import InfiniteScroll from "react-infinite-scroll-component";

const NewChat = ({ onAddChat, existingChats }) => {  // Accept existingChats as a prop
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [items, setItems] = useState(ChatData); // Assume items state for infinite scroll
  const [hasMore, setHasMore] = useState(true); // Flag for infinite scroll

  const togglePopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  // Filter out existing chats from the items
  const availableChats = items.filter(chat => 
    !existingChats.some(existingChat => existingChat.name === chat.name)
  );

  const filteredData = availableChats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    chat.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchMoreData = () => {
    // Logic to fetch more data if needed
  };

  const handleAddChat = (chat) => {
    onAddChat(chat);  // Call the function passed from the parent component
    setIsPopoverVisible(false);  // Close the popover
  };

  const content = (
    <div style={{ maxWidth: '300px', maxHeight: '400px', overflowY: 'auto' }} id='overall'> 
      <Input 
        placeholder="Search by name or role" 
        value={searchTerm} 
        onChange={handleSearch} 
        className="mb-2"
      />
      <InfiniteScroll
        dataLength={availableChats.length}
        next={fetchMoreData}
        hasMore={hasMore}
        endMessage={<p style={{ textAlign: "center" }}>No more messages</p>}
      >
        <div className="col">
          {filteredData.map((chat, index) => (
            <div 
              key={index} 
              className="col mb-2 d-flex flex-column align-items-start"
              onClick={() => handleAddChat(chat)}  // Add chat when clicked
            >
              <div className="chat-item p-2 ms-3 rounded-start-2 w-100">
                <div className="d-flex align-items-center">
                  <div className="avatar me-3">
                    <div className="avatar-placeholder rounded-circle d-flex align-items-center justify-content-center">
                      <span className="text-muted">{chat.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-0">{chat.name}</h6>
                    <small className="text-muted">{chat.role}</small>
                  </div>
                </div>
              </div>
              {index < filteredData.length - 1 && <Divider className="my-1" />}
            </div>
          ))}
          {filteredData.length === 0 && <p className="text-muted">No results found</p>}
        </div>
      </InfiniteScroll>
    </div>
  );

  return (
    <>
      <Popover 
        content={content} 
        title="New Chat" 
        trigger="click" 
        open={isPopoverVisible} 
        onOpenChange={togglePopover}
        placement="bottomLeft"
        overlayStyle={{ width: 'auto', maxWidth: '300px', fontWeight:'400', }}
        className='pop-4'
      >
        <Button type="primary" onClick={togglePopover}>
          <MessageTwoTone />
        </Button>
      </Popover>
    </>
  );
};

export default NewChat;
