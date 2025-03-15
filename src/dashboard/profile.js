import React from 'react'
import Header from './header'

export default function Profile({friendCount,postCount,groupCount,user}) {
    const [handleForm,setHandleForm] = React.useState({
        first_name:'',
        last_name:'',
        phone:'',
        company:'',
        bio:'',
    })

    const handleChange = (e) => {
        setHandleForm({
            ...handleForm,
            [e.target.name]:e.target.value
        })
    }
  return (
    <div>
        <Header />
        <div className="profile-page">
            <div className="content">
                <div className="content__cover">
                    <div className="content__avatar" style={{background:'#8f6ed5 url("https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png") center center no-repeat',backgroundSize:'cover'}}>
                    </div>
                    <div className="content__bull"><span></span><span></span><span></span><span></span><span></span>
                    </div>
                </div>
                <div className="content__actions">
                </div>
                <div className="content__title">
                    <h1 className='mt-4'>Lakshya Dujari</h1><span>Rajasthan, India</span>
                    {/* <h1 className='mt-4'>{user.full_name == null || undefined ? 'Admin Test' : user.full_name} </h1><span>{user.email == null || undefined ? 'Admin Test' : user.email}</span> */}
                </div>
                <div className="content__description">
                    <p>Web Producer - Web Specialist</p>
                    <p>Dujari Data System</p>
                    {/* <p>{user.bio == null || undefined ? 'Test Bio' : user.bio}</p> */}
                </div>
                <ul className="content__list">
                    <li><span>{friendCount == null || undefined ? 0 : friendCount}</span>Friends</li>
                    <li><span>{postCount == null || undefined ? 0: postCount}</span>Photos</li>
                    <li><span>{groupCount == null || undefined ? 0: groupCount}</span>Groups</li>
                </ul>
                <ul className='content__list'>
                {/* input */}      
                    <form className="max-w-md mx-auto">
                        <div className="relative z-0 w-full mb-5 group">
                            <input 
                                type="email" 
                                name="floating_email" 
                                id="floating_email" 
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                                disabled 
                            />
                            <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input 
                                type="password" 
                                name="floating_password" 
                                id="floating_password" 
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                                value={'Test This is not real'}
                                disabled
                            />
                            <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input 
                                type="password" 
                                name="repeat_password" 
                                id="floating_repeat_password" 
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                                value={'Test This is not real'} 
                                disabled 
                            />
                            <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input 
                                    type="text" 
                                    name="first_name" 
                                    id="first_name" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " 
                                    required  
                                    onChange={handleChange}
                                    value={handleChange.first_name}/>
                                <label for="first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input 
                                    type="text" 
                                    name="last_name" 
                                    id="last_name" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " 
                                    required 
                                    value={handleChange.last_name}
                                    onChange={handleChange}    
                                />
                                <label for="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            {/* <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Bio</label> */}
                            <textarea 
                                id="bio" 
                                name='bio'
                                rows="4" 
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder="Bio..."
                                onChange={handleChange}
                                value={handleChange.bio}
                            >
                            </textarea>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input 
                                    type="tel" 
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    name="phone" 
                                    id="phone" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " 
                                    required 
                                    value={handleChange.phone}
                                    onChange={handleChange}
                                />
                                <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input 
                                    type="text" 
                                    name="floating_company" 
                                    id="floating_company" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " 
                                    required 
                                    value={handleChange.company}
                                    onChange={handleChange}
                                />
                                <label for="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                    {/* close input */}
                </ul>
            </div>
            {/* <div className="bg">
                <div><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
            </div> */}
            
        </div>
    </div>
  )
}
