import React, { useState } from 'react'
import login_back from '../assets/login_template.png';
import { toast } from "react-toastify";
import axios from "axios";
import Loader from '../common/loader';

export default function ForgetPassword({ForgetModal}) {
  const [show,setShow] = useState(false);
  const [loader,setLoader] = useState(false);
  const [handleForm,setHandleForm] = useState({
    email:'',
    new_password:'',
    confirm_password:'',
    otp:'',
  });

  const inputHandler = (e) => {
    const {name,value} = e.target;
    setHandleForm({
      ...handleForm,
      [name]:value
    });
  }

  const sendOTP = async (e) => {
    e.preventDefault();
    try{
      setLoader(true);
      const forgetPassApi =  `${process.env.REACT_APP_API_PREFIX}/login/forgot_password/`;  
        const payload = {
            email:handleForm.email,
        }
        const response = await axios.post(forgetPassApi, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
          setShow(true);
          setLoader(false);
          toast.success(response.data.message);
        }else{
          toast.error(response.data.error);
        }
    }catch(err){
      toast.error(err.response.data.error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoader(true);
      const forgetPassApi =  `${process.env.REACT_APP_API_PREFIX}/login/reset_password/`;  
        const payload = {
            email:handleForm.email,
            new_password:handleForm.new_password,
            confirm_password:handleForm.confirm_password,
            otp:handleForm.otp,
        }
        const response = await axios.post(forgetPassApi, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
          setLoader(false);
          toast.success(response.data.message);
          ForgetModal(false);
        }else{
          toast.error(response.data.error);
        }
    }catch(err){
      toast.error(err.response.data.error);
    }
  }

    return (
      <>
      <div className="container-login">
        <div class="card-login login-shadow p-2">
          <div class="flex p-2 gap-1">
            <div class="">
              <span class="bg-red-500 inline-block center w-3 h-3 rounded-full" onClick={(e)=>{ForgetModal(false)}}></span>
            </div>
            <div class="circle">
              <span class="bg-yellow-500 inline-block center w-3 h-3 rounded-full" onClick={(e)=>{ForgetModal(false)}}></span>
            </div>
            <div class="circle">
              <span class="bg-green-500 box inline-block center w-3 h-3 rounded-full" onClick={(e)=>{ForgetModal(false)}}></span>
            </div>
          </div>
          <div class=" h-full flex flex-row gap-5 p-5 justify-center items-center">
              <div class="h-10/12 w-1/2 max-w-70 rounded-xl mb-10 login-shadow2">
                <img src={login_back} alt="login" className='h-full object-fill rounded-xl'/>
              </div>
              <div class="h-auto w-1/2 rounded-xl mb-10">
                <div class="flex flex-col h-full gap-5 ml-10 items-center">
                    <h1 className="text-5xl font-bold text-white text-center"><span style={{color:'#baa6f2'}}> ChatBox </span></h1>
                    <h3 className=' text-gray-300 tracking-wide' >Forget Password</h3>
                    {loader && (
                        <Loader/>
                      )}
                    {!loader && (                      
                      <form class="flex flex-col gap-3 w-10/12">
                        <div class="block relative"> 
                          <label for="email" class="block text-gray-400 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
                          <input 
                            type="text" 
                            id="email" 
                            class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                            value={handleForm.email}
                            name='email'
                            placeholder='Enter your email'
                            onChange={inputHandler}/>
                        </div>
                        {!show && (
                          <>
                            <br/>
                            <button 
                                type="submit" 
                                onClick={sendOTP}
                                class="bg-[#baa6f2] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">
                                  Send OTP
                              </button>
                          </>
                        )}
                        {show && (
                          <>
                            <div class="block relative"> 
                            <label for="new_password" class="block text-gray-400 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
                            <input type="text" 
                              id="new_password" 
                              class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                              value={handleForm.new_password}
                              name='new_password'
                              placeholder='Enter your password'
                              onChange={inputHandler}/>
                          </div>
                          <div class="block relative"> 
                            <label for="confirm_password" class="block text-gray-400 cursor-text text-sm leading-[140%] font-normal mb-2">Confirm Password</label>
                            <input type="text" 
                              id="confirm_password" 
                              class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                              value={handleForm.confirm_password}
                              name='confirm_password'
                              placeholder='Re-Enter your password'
                              onChange={inputHandler}/>
                          </div>
                          <div class="block relative"> 
                            <label for="otp" class="block text-gray-400 cursor-text text-sm leading-[140%] font-normal mb-2">Confirm Password</label>
                            <input type="text" 
                              id="otp" 
                              class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                              value={handleForm.otp}
                              name='otp'
                              maxLength={6}
                              placeholder='Enter your OTP'
                              onChange={inputHandler}/>
                          </div>
                          <br/>
                          <button 
                            type="submit" 
                            onClick={handleSubmit}
                            class="bg-[#baa6f2] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">
                              Submit
                          </button>
                        </>
                        )}
                    </form>
                    )}
                </div>
              </div>
          </div>
        </div>
      </div>
      </>
    )
}
  