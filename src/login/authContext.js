import {createContext, useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { clear, setData } from '../redux/Slice/dataSlice';
import axios from "axios";

const AuthContext = createContext({ user: null });

export default AuthContext

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiPrefix = process.env.REACT_APP_API_PREFIX;

  const [authTokens, setAuthTokens] = useState({
    access: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    refresh: localStorage.getItem("refresh") ? localStorage.getItem("refresh") : null
  });

// const [authTokens, setAuthTokens] = useState(() =>
//     localStorage.getItem("token")
//         ? localStorage.getItem("token")
//         : null
// );

// const [user, setUser] = useState(() => {
//     const token = localStorage.getItem("token");
//     try {
//         return token ? jwtDecode(token) : null;
//     } catch (error) {
//         console.error("Failed to decode token from localStorage", error);
//         return null;
//     }
// });

const [user, setUser] = useState(() => 

    localStorage.getItem("token")
        ? jwtDecode(localStorage.getItem("token"))
        : null
);

    const [loading, setLoading] = useState(true);

    const loginUser = async (email, password) => {
        const loginApi =  `${process.env.REACT_APP_API_PREFIX}/login/token/`;
        try{
            const payload = {
                email:email,
                password:password
            }
            const response = await axios.post(loginApi, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

          if(response.status === 200){
            const data = response.data
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authTokens", data)
            const data_from_server = jwtDecode(response.data.access)
            // tokes set
            localStorage.setItem('token',response.data.access);
            localStorage.setItem('refresh',response.data.refresh);
            // data set
            localStorage.setItem('user_id',data_from_server.user_id);
            localStorage.setItem('email',data_from_server.email);
            localStorage.setItem('username',data_from_server.username);
            localStorage.setItem('fullname',data_from_server.fullname);
            localStorage.setItem('phone',data_from_server.phone);
            localStorage.setItem('bio',data_from_server.bio);
            localStorage.setItem('image',data_from_server.image);
            localStorage.setItem('verified',data_from_server.verified);
            // state set
            dispatch(setData({user_id:data_from_server.user_id,email:data_from_server.email,username:data_from_server.username,fullname:data_from_server.fullname,phone:data_from_server.phone,bio:data_from_server.bio,image:data_from_server.image,verified:data_from_server.verified}));
            toast.success('Login Successfully');
            navigate('/dashboard');
          } else {    
              console.log("there was a server issue");
              toast.error('Invalid Credentials');
          }
        }catch(error){
            toast.error(Object.values(error.response.data)[0])
        }
        
    }

    const registerUser = async (email, username, password, password2) => {
        const response = await fetch( apiPrefix + "/login/register/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        })
        if(response.status === 201){
            // history.push("/login")
            navigate("/");
            toast.success('Account Created Successfully');
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            toast.error('An error occurred');
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.clear();
        dispatch(clear());
        toast.success('Logout Successfully');
        navigate('/');
    }

    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    }

    useEffect(() => {
        try{
            if (authTokens.access) {
                console.log(authTokens);
                setUser(jwtDecode(authTokens.access))
            }
            setLoading(false)
        }catch(error){
            console.log(error);
        }
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}