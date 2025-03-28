import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';
import useAxios from '../axio-config/axiosConfig';

export default function RequestTile( { id,name,email,selected,boxClick,setGrpMsg } ) {
    const axiosInstance = useAxios();
    const getGroupMsgApi = '/messaging/chatwindow/';

    const handleClick = async () => {
        try{
            const payload = {
                group_name: email
            }
            const response = await axiosInstance.post(getGroupMsgApi,payload);
            if(response.status === 200){
                response.data.messages.map((msg) => {
                    const trimmedDate = msg.timestamp.substring(0, 10);
                    const trimmedTime = msg.timestamp.substring(11, 16);
                    msg = `${trimmedDate} ${trimmedTime}`;
                });
                response.data.messages.reverse();
                setGrpMsg(response.data.messages);
                selected(id);
                boxClick(true);
            }         
        }catch(error){
            const errMsg = error.response.data.message;
            toast.error(errMsg);
        }
    }
  return (
    <div className="flex flex-row gap-2 w-full text-[12px] z-50 " onClick={handleClick}>
        <div
            className="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-10 rounded-lg bg-[#232531] px-[10px]"
        >
            <div className="flex justify-center items-center gap-2">
                <div className="text-[#baa6f2] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                    <SendIcon />
                </div>
                <div>
                    <p className="text-white sm:text-xs">{name || 'test'}</p>
                    <p className="text-gray-500 sm:text-xs sm:hidden">{email || 'test@gmail.com'}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
