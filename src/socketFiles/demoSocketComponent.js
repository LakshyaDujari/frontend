import React, { useEffect, useState } from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function DemoSocketComponent({groupMssages,setGroupMessages,messages,setMessages,setDcolor,dcolor,currentGroup}) {
    const [msg,setMsg] = useState('');
    const user = localStorage.getItem('username');
    const group_name = messages[currentGroup].group_name;
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${group_name}/`)

    // Connection opened
    socket.addEventListener("open", event => {
    socket.send("Connection established")
    });

    // Listen for messages
    socket.addEventListener("message", event => {
    console.log("Message from server ", event.data)
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            const messageData = JSON.stringify({
                body: msg,
              });
            socket.send(messageData);
        }catch(err){

        }
        setMsg('')
    
    } 
  return (
    <>
        <div className="w-full h-full flex justify-center items-center flex-col p-2">
            {/* message box header */}
            <div className="flex flex-row">
                <FiberManualRecordIcon className={`text-${dcolor}-500 relative`}/>
                <h1 className='text-sm text-gray-600'>{messages[currentGroup].friend}</h1>
            </div>
            <a href="#" class="block w-96 h-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div class="flex flex-col items-start gap-2.5 relative h-full">
                {groupMssages.length > 0 &&
                    groupMssages.map((msg, index) => (
                        <>
                            <AccountCircleRoundedIcon className="w-8 h-8 text-gray-500 dark:text-gray-400"/>
                            <div class="flex flex-col w-full max-w-[320px] leading-1.5">
                                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span class="text-sm font-semibold text-gray-900 dark:text-white">{msg.author}</span>
                                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{msg.timestamp}</span>
                                </div>
                                <p class="text-sm font-normal py-2 text-gray-900 dark:text-white"> {msg.body}</p>
                                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                            </div>
                        </>
                        ))
                    }
                </div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        id="first_name" 
                        class="fixed w-80 left-24 bottom-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="send message" 
                        required 
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        />
                </form>
            </a>
        </div>
    </>
  )
}