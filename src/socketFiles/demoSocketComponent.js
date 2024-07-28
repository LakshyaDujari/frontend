import React, { useState } from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function DemoSocketComponent({setCurrentGroup,setBoxClick,groupMssages,setGroupMessages,messages,setMessages,setDcolor,dcolor,currentGroup}) {
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
    <div className='rounded-t-3xl scrollbar-hide fixed bottom-0 left-16 w-96 h-96 z-50 overflow-x-hidden'
         onBlur={(e)=>{
            e.preventDefault();
            setBoxClick(false);
            setGroupMessages('');
            setMsg('');
            setCurrentGroup(0)
            }}> 
        <div className="w-full h-full flex justify-center items-center flex-col p-2">
            {/* message box header */}
            <a href="#" class=" mt-20 block w-96 h-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div class="flex flex-col items-start gap-2.5 relative h-full">
                {groupMssages.length > 0 &&
                    groupMssages.map((msg, index) => {
                        const date = new Date(msg.timestamp);
                        const dateOptions = { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric'
                        };
                        const timeOptions = { 
                            hour: 'numeric', 
                            minute: 'numeric', 
                            hour12: true 
                        };
                        let display_name = false;
                        let msg_orentation = '';
                        if(sys_user === msg.author){
                            display_name = false;
                            msg_orentation = 'user-self-message';
                        }
                        else{
                            display_name = true;
                            msg_orentation = 'user-other-message';
                        }
                        const formattedDate = date.toLocaleDateString('en-US', dateOptions);
                        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
                        return (
                            <div key={index} className={`${msg_orentation}`}>
                                <AccountCircleRoundedIcon className="w-8 h-8 text-gray-500 dark:text-gray-400"/>
                                <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                                    <p className="text-sm font-normal py-2 text-gray-900 dark:text-white">{msg.body}</p>
                                    <div className="flex items-center justify-end space-x-2 ">
                                        {display_name && <span className="text-sm font-semibold text-gray-900 dark:text-white">{msg.author}</span>}
                                        <div className="flex flex-col">
                                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{formattedDate + '  '+ formattedTime}</span>
                                            {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{}</span> */}
                                        </div>
                                    </div>
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </a>
        </div>
        <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        id="first_name" 
                        class="fixed w-96 bottom-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="send message" 
                        required 
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        />
                </form>
        </div>
    </>
  )
}