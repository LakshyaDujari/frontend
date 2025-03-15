import React, { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiPaperclip, FiSend, FiX } from 'react-icons/fi';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const ChatWidget = ({groupMssages,setGroupMessages,messages,setMessages,currentGroup}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [inputMessage, setInputMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef(null);
    let group_name;
    let socket;
    const token = localStorage.getItem('token');
    const sys_user = localStorage.getItem('username');
    group_name = messages[currentGroup].group_name;
    const apiPrefix = process.env.REACT_APP_API_PREFIX;
    const wsUrl = `ws://${apiPrefix.replace(/^http:\/\//, '')}/ws/chat/${group_name}/?token=${token}`;
    try{
        socket = new WebSocket(wsUrl);

        socket.addEventListener("message", event => {
            console.log("Message from chat ", event.data)
            const message = JSON.parse(event.data);
            const new_msg = {
                body: message.message,
                author: message.author,
                timestamp: message.timestamp
            }
            setGroupMessages([...groupMssages,new_msg]);
        });
    }catch(err){

    }   
    const handleSubmit = (e) => {
        // e.preventDefault();
        try{
            const messageData = JSON.stringify({
                body: inputMessage,
            });
            socket.send(messageData);
            setInputMessage("");
        }catch(err){

        }
    
    } 
  const toggleChat = () => setIsOpen(!isOpen);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        setMessages([...messages, { text: `File uploaded: ${file.name}`, sender: 'user', isFile: true }]);
    }
  };

  const addEmoji = (emoji) => {
    setInputMessage(inputMessage + emoji.native);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-[#564592] hover:bg-[#564592] text-white rounded-full p-3 shadow-lg transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#564592] focus:ring-opacity-50"
          aria-label="Open chat"
        >
          <FiMessageSquare className="w-6 h-6" />
        </button>
     )}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[32rem] flex flex-col overflow-hidden">
          <div className="bg-[#baa6f2] text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">{messages[currentGroup].sender}</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200 focus:outline-none">
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${sys_user === 'msg.author' ? 'bg-blue-100 text-[#5b46a8]' : 'bg-gray-200 text-gray-800'}`}
                >
                  {message.isFile ? (
                    <div className="flex items-center">
                      <FiPaperclip className="mr-2" />
                      <span>{message.text}</span>
                    </div>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t">
            <div className="relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full p-2 pr-24 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b3a7e0]"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-gray-500 hover:text-blue-500 focus:outline-none"
                  aria-label="Add emoji"
                >
                  😊
                </button>
                <label className="cursor-pointer text-gray-500 hover:text-blue-500">
                  <FiPaperclip className="w-5 h-5" />
                  <input type="file" className="hidden" onChange={handleFileUpload} />
                </label>
                <button
                  onClick={handleSubmit}
                  className="bg-[#baa6f2] hover:bg-[#baa6f2] text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-[#baaee3]"
                  aria-label="Send message"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </div>
            {showEmojiPicker && (
              <div className="absolute bottom-20 right-0">
                <Picker data={data} onEmojiSelect={addEmoji} />
              </div>
            )}
          </div>
        </div>
        )}
    </div>
  );
};

export default ChatWidget;