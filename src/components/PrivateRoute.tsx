import {useAuth} from "./AuthProvider";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
    const user = useAuth();
    if(!user.user?.password) return <Navigate to={"/signin"}/>
    return <Outlet/>
}

export default PrivateRoute;