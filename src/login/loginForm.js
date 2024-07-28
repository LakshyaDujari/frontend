import React, { useEffect, useState,useContext } from 'react'
import login_back from '../assets/login_template.png'
import AuthContext from '../login/authContext';

export default function Login() {
  const {loginUser} = useContext(AuthContext)
  const [handleForm,setHandleForm] = useState({
    email:'',
    password:''
  });
  const inputHandler = (e) => {
    const {name,value} = e.target;
    setHandleForm({
      ...handleForm,
      [name]:value
    });
  }

  useEffect(() => {
    document.body.style.backgroundColor = '#67627a';
  }, [])
  
  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(handleForm.email,handleForm.password);
  }
    return (
      <>
      <div className="container-login">
        <div class="card-login login-shadow p-2">
          <div class="flex p-2 gap-1">
            <div class="">
              <span class="bg-red-500 inline-block center w-3 h-3 rounded-full"></span>
            </div>
            <div class="circle">
              <span class="bg-yellow-500 inline-block center w-3 h-3 rounded-full"></span>
            </div>
            <div class="circle">
              <span class="bg-green-500 box inline-block center w-3 h-3 rounded-full"></span>
            </div>
          </div>
          <div class=" h-full flex flex-row gap-5 p-5">
              <div class="h-10/12 w-1/2 rounded-xl mb-10 login-shadow2">
                <img src={login_back} alt="login" className='h-full object-fill rounded-xl'/>
              </div>
              <div class="h-10/12 w-1/2 rounded-xl mb-10">
                <div class="flex flex-col h-full gap-5 p-5 ml-10 items-center">
                    <h1 className="text-6xl font-bold text-white text-center">Welcome to<span style={{color:'#baa6f2'}}> ChatBox </span></h1>
                    <h3 className=' text-gray-300 tracking-wide' >Log in to your account</h3>
                    <form class="flex flex-col gap-3 w-10/12">
                      <div class="block relative"> 
                        <label for="email" class="block text-gray-400 cursor-text text-sm leading-[140%] font-normal mb-2">Username</label>
                        <input 
                          type="text" 
                          id="email" 
                          class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                          value={handleForm.email}
                          name='email'
                          placeholder='Enter your email'
                          onChange={inputHandler}/>
                      </div>
                      <div class="block relative"> 
                        <label for="password" class="block text-gray-400 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
                        <input type="text" 
                          id="password" 
                          class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                          value={handleForm.password}
                          name='password'
                          placeholder='Enter your password'
                          onChange={inputHandler}/>
                      </div>
                      <div>
                        <a class="text-sm text-[#baa6f2]" href="https://google.com">Forgot your password?</a></div>
                      <button type="submit" class="bg-[#baa6f2] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"onClick={submitHandler}>Submit</button>

                  </form>
                  <div class="text-sm text-center mt-[1.6rem] text-white">Don’t have an account yet? <a class="text-sm text-[#baa6f2]" href="https://google.com">Sign up for free!</a></div>
                </div>
              </div>
          </div>
        </div>
      </div>
      </>
    )
}
  