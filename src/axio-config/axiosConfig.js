import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../login/authContext";

const baseURL = process.env.REACT_APP_API_PREFIX;

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/login/token/refresh/`, {
      refresh: authTokens.refresh
    });
    localStorage.setItem("token", response.data.access);
    localStorage.setItem("authTokens", response.data.access);
    if(response.data === null || response.data === undefined){
    }
    setAuthTokens({
      ...authTokens,
      access: response.data.access
    });
    if(response.data === null || response.data === undefined){
    }
    setUser(jwtDecode(response.data.refresh));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;