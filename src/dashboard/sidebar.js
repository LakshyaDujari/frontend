import React, { useEffect, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import Person3Icon from '@mui/icons-material/Person3';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectData, setData } from '../redux/Slice/dataSlice';
import { toast } from 'react-toastify';
import axiosInstance from '../axio-config/axiosConfig';
export default function Sidebar() {
    // const user = localStorage.getItem('username');
    // const email = localStorage.getItem('email');
    const storeValue = useSelector(selectData);
    const navigate = useNavigate();
    const [user,setUserName] = useState(storeValue.username);
    const [email,setEmail] = useState(storeValue.email);
    const [isFriend,setIsFriend] = useState(false);
    const friendRequestApi = '/friend/add_friend/';
    const dispatch = useDispatch();

    useEffect(() => {
        setUserName(storeValue.username);
        setEmail(storeValue.email);
        setIsFriend(storeValue.friend);
    },[storeValue])

    const handleInvite = async () => {
        try{
            const payload = {
                friend_id: storeValue.id,
            }
            const response = await axiosInstance.post(friendRequestApi,payload);
            if(response.status === 200){
                toast.success('Friend Request Sent');
            }
        }catch(error){
            const errMsg = Object.values(error.response.data)[0]
            console.log(errMsg)
            toast.error(errMsg)
        }
    }

    const handleHomeClick = () => {
        dispatch(setData({ username: localStorage.getItem('username'), email: localStorage.getItem('email'), id: localStorage.getItem('id'),friend:true}));
        navigate('/dashboard');
    }


    return (
        <div class="flex flex-col w-80 h-full bg-slate-50 gap-4 p-4 rounded-2xl">
            <div class="group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-purple-200 via-purple-300 to-purple-400 before:absolute before:top-0 w-80 h-72 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden shadow-dash">
                <div class="w-28 h-28 background-app-dark mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500"></div>
                <div class="z-10  group-hover:-translate-y-10 transition-all duration-500">
                    <span class="text-2xl font-semibold group-hover:text-white transition-all duration-75">{user || 'Guest'}</span>
                    <p className=' group-hover:text-white transition-all duration-75'>{email || 'guest@example.com'}</p>
                </div>
                {/* Follow Button */}
                {!isFriend && (
                    <h1 class="background-app-dark px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-[#564592]"
                    onClick={handleInvite}>Follow</h1>
                )}
            </div>
            {/* home Button */}
            <div class="flex flex-col gap-2 w-60 sm:w-80 sm:text-s z-50 shadow-lg mt-4" 
            onClick={handleHomeClick}>
                <div
                    class="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg background-app-dark px-[10px]"
                >
                    <div class="flex gap-2 justify-center items-center">
                        <div class="text-[#baa6f2] background-app-dark backdrop-blur-xl p-1 rounded-lg">
                            <HomeIcon />
                        </div>
                        <p class="text-white text-xl">Home</p>
                    </div>
                </div>
            </div>
            {/* Bookmark Button */}
            <div class="flex flex-col gap-2 w-60 sm:w-80 sm:text-s z-50 shadow-lg">
                <div
                    class="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg background-app-dark px-[10px]"
                >
                    <div class="flex gap-2 justify-center items-center">
                        <div class="text-[#baa6f2] background-app-dark backdrop-blur-xl p-1 rounded-lg">
                            <BookmarkIcon />
                        </div>
                        <p class="text-white text-xl">Bookmark</p>
                    </div>
                </div>
            </div>
            {/* Settings Button */}
            <div class="flex flex-col gap-2 w-60 sm:w-80 sm:text-s z-50 shadow-lg">
                <div
                    class="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg background-app-dark px-[10px]"
                >
                    <div class="flex gap-2 justify-center items-center">
                        <div class="text-[#baa6f2] background-app-dark backdrop-blur-xl p-1 rounded-lg">
                            <SettingsIcon />
                        </div>
                        <p class="text-white text-xl">Settings</p>
                    </div>
                </div>
            </div>
            {/* Profile Button */}
            <div class="flex flex-col gap-2 w-60 sm:w-80 sm:text-s z-50 shadow-lg">
                <div
                    class="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg background-app-dark px-[10px]"
                >
                    <div class="flex gap-2 justify-center items-center">
                        <div class="text-[#baa6f2] background-app-dark backdrop-blur-xl p-1 rounded-lg">
                            <Person3Icon />
                        </div>
                        <p class="text-white text-xl">Profile</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
 