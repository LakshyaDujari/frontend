import React from 'react'
import { toast } from 'react-toastify';
import useAxios from '../axio-config/axiosConfig';

export default function FriendRequestTile({name, email, id, requestSetter, requests}) {
    const accept_api = '/friend/accept_friend_request/';
    const reject_api = '/friend/reject_friend_request/';
    const axiosInstance = useAxios();

    const handleReject = async () => {
        try{
            const payload = {
                'friend_id': name,
            }
            const response = await axiosInstance.post(reject_api, payload);
            if(response.status === 200){
                toast.success('Friend request rejected');
                requestSetter(requests.filter((req) => req.friend_id !== id));

            }
        }catch(error){
            if(error.response){
                const errMsg = Object.values(error.response.data)[0];
                toast.error(errMsg);
                toast.error('Failed to reject friend request');
            }else{
                toast.error('Failed to reject friend request');
            }
        }
    }
    const handleAccept = async () => {
        try{
            const payload = {
                'friend_id': id,
            }
            const response = await axiosInstance.post(accept_api, payload);
            if(response.status === 200){
                toast.success('Friend request accepted');
                requestSetter(requests.filter((req) => req.friend_id !== id));
            }
        }catch(error){
            const errMsg = Object.values(error.response.data)[0];
            toast.error(errMsg);
            toast.error('Failed to accept friend request');
        }
    }   
  return (
    <div className="flex flex-row gap-2 w-full text-[12px] z-50">
        <div
            className="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]"
        >
            <div className="flex gap-2 w-full">
                <div className="text-[#baa6f2] bg-white/5 backdrop-blur-xl p-1 rounded-lg w-9"
                    onClick={handleAccept}
                    >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                    >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                    ></path>
                    </svg>
                </div>
                <div className='w-2/3'>
                    <p className="text-white">{name || 'test'}</p>
                    <p className="text-gray-500">{email || 'test@gmail.com'}</p>
                </div>
                <button
                    onClick={handleReject}
                    className="text-red-600 text-gray-600 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
            </div>
        </div>
  )
}
