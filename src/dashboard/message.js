import React, { useEffect, useState } from 'react'
import RequestTile from './requestTile'
import { toast } from 'react-toastify';
import axiosInstance from '../axio-config/axiosConfig';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DemoSocketComponent from '../socketFiles/demoSocketComponent';

export default function Message() {
    const msgApis = '/messaging/get_all_groups/';
    const [messages, setMessages] = useState([]);
    const [online, setOnline] = useState(false);
    const [dcolor, setDcolor] = useState('red');
    const [currentGroup, setCurrentGroup] = useState(0);
    const [boxClick,setBoxClick] = useState(false);
    const [groupMssages, setGroupMessages] = useState([]);
    const [msg, setMsg] = useState('');
    
    const handleMsgSubmit = async (e) => {
        e.preventDefault();
        try{
            const payload = {
                group_name: messages[currentGroup].group_name,
                message: msg
            }
            const response = await axiosInstance.post('/messaging/sendmsg/',payload);
            if(response.status === 200){
                groupMssages.push({
                    body: msg,
                    author: localStorage.getItem('username'),
                    timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
                })
                setGroupMessages([...groupMssages]);
                setMsg('');
            }
        }catch(error){
            const message = error.response.data.message;
            toast.error(message);
        }
    
    }

    useEffect(() => {
        if(online){
            setDcolor('green');
        }else{
            setDcolor('red');
        }
    }, [online]);

    useEffect(() => {
        async function fetchData(){
            try{
               const fullUrl = axiosInstance.defaults.baseURL + msgApis; 
                const response = await axiosInstance.get(msgApis);
                if(response.status === 200){
                    setMessages(response.data.groups);
                    console.log(response.data.groups);
                }
            }catch(error){
                const message = error.response.data.message;
                toast.error(message);
            }
        }
        fetchData();
    }, [msgApis]);

  return (
    <>
         {/* Message request box */}
        <div class="card-dash shadow-dash p-4 flex flex-col">
            <h1 className='text-3xl font-bold text-gray-600 text-center mb-3 mt-2 '> Messages </h1>
            {/* search bar */}
            <form class="form relative mt-2 w-full">
                <button class="absolute left-2 -translate-y-1/2 top-1/2 p-1">
                    <svg
                    width="17"
                    height="16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-labelledby="search"
                    class="w-5 h-5 text-gray-700"
                    >
                    <path
                        d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                        stroke="currentColor"
                        stroke-width="1.333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    </svg>
                </button>
                <input
                    class=" w-full h-8 input rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
                    placeholder="Search..."
                    required=""
                    type="text"
                />
            </form>
            <div className="flex items-center mt-4 w-full flex-col gap-2 overflow-y-scroll scrollbar-hide">
                {
                    messages.map((msg, index) => (
                        <RequestTile 
                            key={index}
                            id = {index}
                            selected={setCurrentGroup}
                            name={msg.friend}
                            boxClick = {setBoxClick}
                            setGrpMsg = {setGroupMessages}
                            email={msg.group_name}
                        />
                    ))
                }
            </div>
        </div>
        {/* Message send container */}
        {( messages.length > 0 && !boxClick )&&        
            <div className='msg-container fixed bottom-0 left-24 w-80 h-14 z-10 flex justify-start place-items-start flex-row p-5 gap-2'> 
                <FiberManualRecordIcon className={`text-${dcolor}-500 relative`}/>
                <h1 className='text-sm text-gray-600'>{messages[currentGroup].friend}</h1>
            </div>
        }
        {( messages.length > 0 && boxClick ) && 
            <div className='border-r-2 scrollbar-hide fixed bottom-0 left-16 w-96 h-96 z-50 overflow-x-hidden' onBlur={(e)=>{setBoxClick(false);setGroupMessages('');setMsg('');setCurrentGroup(0)}}> 
                <DemoSocketComponent
                    groupMssages={groupMssages}
                    setGroupMessages={setGroupMessages}
                    messages={messages}
                    setMessages={setMessages}
                    dcolor={dcolor}
                    setDcolor={setDcolor}
                    currentGroup={currentGroup}
                />
            </div>
        }
    </>
 )
}
