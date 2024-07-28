import { Navigate,Outlet } from "react-router-dom"
import {useContext} from "react"
import AuthContext from "./authContext"


const PrivateRoute = () => {
    let {user} = useContext(AuthContext)
    return user ? <Outlet /> : <Navigate to="/" />;
    // return <Route {...rest}>{!user ? <Navigate to="/" /> : children}</Route>
}

export default PrivateRoute