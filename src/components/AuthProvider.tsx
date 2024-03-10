import {useContext, createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SignInResponse, UserData, UserDataResponse} from "../util/BackendAuth";

interface AuthContextProps {
    token: string;
    user: UserData | null;
    loginAction: (data: any) => Promise<any>;
    logOut: () => void;
    fetchUser: () => Promise<UserData | null>
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
            const res = await response.json() as SignInResponse;
            setUser(res.d.userData);
            setToken(res.d.token);
            localStorage.setItem("site", res.d.token);
            navigate("/account");

            return res
        } catch (err) {
            console.error(err);
        }
    }

    const fetchUser = async (): Promise<UserData | null> => {
        try {
            const response = await fetch("http://localhost:3001/user/me", {
                method: "GET",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });
            const res = await response.json() as UserDataResponse;

            if(res.op !== 0){
                return res.d as UserData;
            } else {
                navigate("/login")
                return null
            }
        } catch (err) {
            console.error(err)
        }

        return null;
    }

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/signin")
    }

    return <AuthContext.Provider value={{token, user, loginAction, logOut, fetchUser}}>{children}</AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}
