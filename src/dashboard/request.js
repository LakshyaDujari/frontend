import React, { useEffect, useState } from 'react'
import FriendRequestTile from './friendrequestile'
import useAxios from '../axio-config/axiosConfig';
import { toast } from 'react-toastify';

export default function RequestModal() {
    const requestApis = '/friend/get_friend_request/';   
    const [requests, setRequests] = useState([]);
    const axiosInstance = useAxios();
    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axiosInstance.get(requestApis);
                if(response.status === 200){
                    setRequests(response.data.friend_requests);
                }
           }catch(error){
                const message = error.response.data.message;
                toast.error(message);
            }
        }
        fetchData();
    }, [requestApis]);
  return (
    <div className="card-dash shadow-dash p-4 flex flex-col sm:w-full sm:h-2/5">
        <h1 className='text-3xl font-bold text-gray-600 text-center mb-3 mt-2 '> Friend Requests </h1>
        {/* search bar */}
        <form className="form relative mt-2 w-full">
            <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
                <svg
                width="17"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="search"
                className="w-5 h-5 text-gray-700"
                >
                <path
                    d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                    stroke="currentColor"
                    strokeWidth="1.333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
                </svg>
            </button>
            <input
                className=" w-full h-8 input rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
                placeholder="Search..."
                required=""
                type="text"
            />
        </form>
        <div className="flex items-center mt-4 w-full flex-col gap-2">
            {
                requests.map((req, index) => (
                    <FriendRequestTile 
                        key={index}
                        name={req.username}
                        email={req.email}
                        id={req.friend_id}
                        requestSetter = {setRequests}
                        requests={requests}
                    />
                ))
            }
        </div>
    </div>
  )
}
