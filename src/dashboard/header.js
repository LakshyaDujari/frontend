import React, { useEffect, useState,useContext } from 'react';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import useAxios from '../axio-config/axiosConfig';
import { setData } from '../redux/Slice/dataSlice';
import AuthContext from '../login/authContext';

export default function Header() {
    const {logoutUser} = useContext(AuthContext)
    const logout_api = '/login/logout/';
    const search_api = '/login/get_user_list/'; // Update with your search endpoint
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const axiosInstance = useAxios();
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleLogout = async () => {
        try {
            const payload = { refresh_token: localStorage.getItem('refresh') };
            const response = await axiosInstance.post(logout_api,payload);
            if (response.status === 200) {
                logoutUser();
            } else {
                toast.error('Invalid Credentials');
            }
        } catch (error) {
            toast.error(Object.values(error.response.data)[0]);
        }
    };

    const handleHomeClick = () => {
        dispatch(setData({user_id:localStorage.getItem('user_id'),email:localStorage.getItem('email'),username:localStorage.getItem('username'),fullname:localStorage.getItem('fullname'),phone:localStorage.getItem('phone'),bio:localStorage.getItem('bio'),image:localStorage.getItem('image'),verified:localStorage.getItem('verified')}));
        navigate('/dashboard');
    }

    const handleProfileClick = () => {
        navigate('/profile');
    }

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchInput(query);

        if (query.length > 0) {
            try {
                // setShowSuggestions(true);
            } catch (error) {
                console.error('Error fetching search suggestions:', error);
                setSuggestions([]);
            }
        } else {
            setShowSuggestions(false);
        }
    };

    const fetchSearchSuggestions = async (query) => {
        try{
            const payload = { search_query:query };
            const response = await axiosInstance.post(search_api, payload);
            if(response.status === 200){ 
                setSuggestions(response.data);
                setShowSuggestions(true);
            }else{
                setShowSuggestions(false);
            }
        }catch(error){
            const errMsg = Object.values(error.response)[0]
            toast.error(errMsg)
        }
    }

    const handleSuggestionClick = (suggestion) => {
        for (let i = 0; i < suggestions.length; i++) {
            if (suggestions[i].username === suggestion) {
                dispatch(setData({user_id:suggestions[i].user_id,email:suggestions[i].email,username:suggestions[i].username,fullname:suggestions[i].fullname,phone:suggestions[i].phone,bio:suggestions[i].bio,image:suggestions[i].image,verified:suggestions[i].verified}));
                break;
            }
        }
        setSearchInput(suggestion);
        setShowSuggestions(false);
        // Navigate to the suggestion's page or perform any action you want
        // navigate(`/search?query=${suggestion}`);
    };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if(searchInput.length > 0){
        fetchSearchSuggestions(searchInput);
        handleSearchChange({target:{value:searchInput}});
      }
    }, 1500)
    return () => {
      clearTimeout(timeOutId);
    }
  }, [searchInput])

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <p className="flex items-center space-x-3 rtl:space-x-reverse" onClick={()=>{navigate('/dashboard');}}>
                        <HeadsetMicIcon style={{ color: '#baa6f2' }} />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Chat<span style={{ color: '#baa6f2' }}>Box</span>
                        </span>
                    </p>
                    <div className="flex md:order-2">
                        <button
                            type="button"
                            data-collapse-toggle="navbar-search"
                            aria-controls="navbar-search"
                            aria-expanded="false"
                            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
                        >
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                        <div className="relative hidden md:block">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input
                                type="text"
                                id="search-navbar"
                                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search..."
                                value={searchInput}
                                onChange={handleSearchChange}
                            />
                            {showSuggestions && (
                                <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                    {suggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSuggestionClick(suggestion.username)}
                                        >
                                            {suggestion.username}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button
                            data-collapse-toggle="navbar-search"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-search"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                        <div className="relative mt-3 md:hidden">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="search-navbar"
                                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search..."
                                value={searchInput}
                                onChange={handleSearchChange}
                            />
                            {showSuggestions && (
                                <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                    {suggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSuggestionClick(suggestion.username)}
                                        >
                                            {suggestion.username}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <h1
                                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                    aria-current="page"
                                    onClick={handleHomeClick}
                                >
                                    Home
                                </h1>
                            </li>
                            <li>
                                <h1 
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    onClick={handleProfileClick}>
                                    Profile
                                </h1>
                            </li>
                            <li>
                                <h1
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </h1>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
