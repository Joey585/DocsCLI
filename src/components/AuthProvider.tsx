import {useContext, createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {APIResponse, isUserData, UserData} from "../util/BackendAuth";

interface AuthContextProps {
    token: string;
    user: UserData | null;
    loginAction: (data: any) => Promise<any>;
    logOut: () => void;
}

const AuthContext = createContext({} as AuthContextProps);


const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [token, setToken] = useState<string>(localStorage.getItem("site") as string);
    const navigate = useNavigate();
    const loginAction = async (data: any) => {
        try{
            const response = await fetch("http://localhost:3001/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const res = await response.json() as APIResponse<UserData | number>;
            if(isUserData(res.d)){
                setUser(res.d);
                setToken(res.d.password as string);
                localStorage.setItem("site", res.d.password);
                navigate("/account");
            }
            return res
        } catch (err) {
            console.error(err);
        }
    }

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/signin")
    }

    return <AuthContext.Provider value={{token, user, loginAction, logOut}}>{children}</AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}
