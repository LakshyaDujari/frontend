// import React, { useState } from 'react'
// import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// export default function DemoSocketComponent({setCurrentGroup,setBoxClick,groupMssages,setGroupMessages,messages,setMessages,setDcolor,dcolor,currentGroup}) {
//     const [msg,setMsg] = useState('');
//     let group_name;
//     let socket;
//     const token = localStorage.getItem('token');
//     const sys_user = localStorage.getItem('username');
//     group_name = messages[currentGroup].group_name;
//     const apiPrefix = process.env.REACT_APP_API_PREFIX;
//     const wsUrl = `ws://${apiPrefix.replace(/^http:\/\//, '')}/ws/chat/${group_name}/?token=${token}`;
//     try{
//         socket = new WebSocket(wsUrl);

//         socket.addEventListener("message", event => {
//             console.log("Message from chat ", event.data)
//             const message = JSON.parse(event.data);
//             const new_msg = {
//                 body: message.message,
//                 author: message.author,
//                 timestamp: message.timestamp
//             }
//             setGroupMessages([...groupMssages,new_msg]);
//         });
//     }catch(err){

//     }   
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         try{
//             const messageData = JSON.stringify({
//                 body: msg,
//             });
//             socket.send(messageData);
//         }catch(err){

//         }
//         setMsg('')
    
//     } 
//   return (
//     <>
//     <div className='rounded-t-3xl scrollbar-hide fixed bottom-0 left-16 w-96 h-96 z-50 overflow-x-hidden'
//          onBlur={(e)=>{
//             e.preventDefault();
//             setBoxClick(false);
//             setGroupMessages('');
//             setMsg('');
//             setCurrentGroup(0)
//             }}> 
//         <div className="w-full h-full flex justify-center items-center flex-col p-2">
//             {/* message box header */}
//             <a href="#" classname=" mt-20 block w-96 h-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
//                 <div classname="flex flex-col items-start gap-2.5 relative h-full">
//                 {groupMssages.length > 0 &&
//                     groupMssages.map((msg, index) => {
//                         const date = new Date(msg.timestamp);
//                         const dateOptions = { 
//                             year: 'numeric', 
//                             month: 'long', 
//                             day: 'numeric'
//                         };
//                         const timeOptions = { 
//                             hour: 'numeric', 
//                             minute: 'numeric', 
//                             hour12: true 
//                         };
//                         let display_name = false;
//                         let msg_orentation = '';
//                         if(sys_user === msg.author){
//                             display_name = false;
//                             msg_orentation = 'user-self-message';
//                         }
//                         else{
//                             display_name = true;
//                             msg_orentation = 'user-other-message';
//                         }
//                         const formattedDate = date.toLocaleDateString('en-US', dateOptions);
//                         const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
//                         return (
//                             <div key={index} className={`${msg_orentation}`}>
//                                 <AccountCircleRoundedIcon className="w-8 h-8 text-gray-500 dark:text-gray-400"/>
//                                 <div className="flex flex-col w-full max-w-[320px] leading-1.5">
//                                     <p className="text-sm font-normal py-2 text-gray-900 dark:text-white">{msg.body}</p>
//                                     <div className="flex items-center justify-end space-x-2 ">
//                                         {display_name && <span className="text-sm font-semibold text-gray-900 dark:text-white">{msg.author}</span>}
//                                         <div className="flex flex-col">
//                                             <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{formattedDate + '  '+ formattedTime}</span>
//                                             {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{}</span> */}
//                                         </div>
//                                     </div>
//                                     <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </a>
//         </div>
//         <form onSubmit={handleSubmit}>
//                     <input 
//                         type="text" 
//                         id="first_name" 
//                         classname="fixed w-96 bottom-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
//                         placeholder="send message" 
//                         required 
//                         value={msg}
//                         onChange={(e) => setMsg(e.target.value)}
//                         />
//                 </form>
//         </div>
//     </>
//   )
// }

import React, { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiPaperclip, FiSend, FiX } from 'react-icons/fi';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const ChatWidget = ({groupMssages,setGroupMessages,messages,setMessages,currentGroup}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [inputMessage, setInputMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef(null);
    const [msg,setMsg] = useState('');
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
        }catch(err){

        }
        setMsg('')
    
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
                  className={`inline-block p-2 rounded-lg ${sys_user === msg.author ? 'bg-blue-100 text-[#5b46a8]' : 'bg-gray-200 text-gray-800'}`}
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