import React, { useEffect, useState,useContext } from 'react'
import AuthContext from './authContext';
import ForgetPassword from './forgetPass';

export default function NewLoginForm() {

    const {loginUser,registerUser} = useContext(AuthContext)

    const [showModal,setShowModal] = useState(false);

    const [handleForm,setHandleForm] = useState({
      email:'',
      password:''
    });

    const [registerForm,setRegisterForm] = useState({
        username:'',
        email:'',
        password1:'',
        password2:'',
    })

    const inputHandler = (e) => {
      const {name,value} = e.target;
      setHandleForm({
        ...handleForm,
        [name]:value
      });
    }
    
    const registerFormInputHandler = (e) =>{
        const {name,value} = e.target;
        setRegisterForm({
          ...registerForm,
          [name]:value
        });
    }

    
    const submitHandler = async (e) => {
        e.preventDefault();
        await loginUser(handleForm.email,handleForm.password);
    }
    
    const registerSubmit = async (e) =>{
        e.preventDefault();
        await registerUser(registerForm.email,registerForm.username,registerForm.password1,registerForm.password2); 
    }
    
    const handleRegisterClick = () => {
        const container = document.getElementById('container');
        container.classList.add("nlogin-active");
    };
    
    const handleLoginClick =  () => {
        const container = document.getElementById('container');
        container.classList.remove("nlogin-active");
    }

    const handleForgetPassword = () => {
        setShowModal(true);
    }
    
    useEffect(() => {
      document.body.style.backgroundColor = '#676279';
    }, [])

  return (
        <>
        {!showModal && (
            <div className="flex w-full h-full justify-center items-center">
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
            />
            <title>ChatBox</title>
            <div className="nlogin-container" id="container">
                <div className="nlogin-form-container nlogin-sign-up">
                <form>
                    <h1 className='font-black text-3xl'>Create Account</h1>
                    <span>or use your email for registeration</span><br/>
                    <input name="username" value={registerForm.username} type="text" placeholder="Username" onChange={registerFormInputHandler} />
                    <input name="email" value={registerForm.email} type="email" placeholder="Email" onChange={registerFormInputHandler}/>
                    <input name="password1" value={registerForm.password1} type="password" placeholder="Password" onChange={registerFormInputHandler}/>
                    <input name="password2" value={registerForm.password2} type="password" placeholder="Confirm Password" onChange={registerFormInputHandler}/>
                    <button onClick={registerSubmit}>Sign Up</button>
                </form>
                </div>
                <div className="nlogin-form-container nlogin-sign-in">
                <form>
                    <h1 className='font-black text-3xl'>Sign In</h1>
                    <span>or use your email password</span><br/>
                    <input 
                        type="text" 
                        id="email" 
                        class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                        value={handleForm.email}
                        name='email'
                        placeholder='Enter your email'
                        onChange={inputHandler}
                    />
                    <input type="text" 
                        id="password" 
                        class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                        value={handleForm.password}
                        name='password'
                        placeholder='Enter your password'
                        onChange={inputHandler}
                    />
                    <p className='hover:cursor-pointer'><span style={{color:'#562fc2'}} onClick={handleForgetPassword}>Forget Your Password?</span></p>
                    <button onClick={submitHandler}>Sign In</button>
                </form>
                </div>
                <div className="nlogin-toggle-container">
                <div className="nlogin-toggle">
                    <div className="nlogin-toggle-panel nlogin-toggle-left">
                    <h1 className="text-3xl font-bold text-white text-center">Welcome to<span style={{color:'#6147a7e8',fontSize:'2rem'}}> ChatBox </span></h1>
                    {/* <h1 className='font-extrabold text-3xl'>Welcome Back!</h1> */}
                    <p>Enter your personal details to use all of site features</p>
                    <button id="login" className='nlogin-hidden' onClick={handleLoginClick}>
                        Sign In
                    </button>
                    </div>
                    <div className="nlogin-toggle-panel nlogin-toggle-right">
                    <h1 className="text-3xl font-bold text-white text-center">Welcome, Friend!<span style={{color:'#baa6f2',fontSize:'2rem'}}> ChatBox </span></h1>
                    {/* <h1 className='font-black text-3xl'>Welcome, Friend!</h1> */}
                    <p>Enter your personal details to use all of site features</p>
                    <button id="register" className = 'nlogin-hidden' onClick={handleRegisterClick}>
                        Sign Up
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        )}
        {showModal && (<ForgetPassword ForgetModal={setShowModal}/>)}
        </>
 )
}
