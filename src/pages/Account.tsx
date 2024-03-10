import {useAuth} from "../components/AuthProvider";
import {useEffect, useState} from "react";
import {UserData} from "../util/BackendAuth";
export const Account = () => {
    const auth = useAuth();
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const userData = await auth.fetchUser();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        })();
    }, [auth]);


    const authGoogle = () => {
        const oauth2Window = window.open("http://localhost:3001/auth/google?auth=" + auth.token, "oauth2window", "width=500,height=600,popup");
        if(oauth2Window){
            oauth2Window.addEventListener("unload", () => {
                window.location.reload();
            })
        }

    }

    return(
        <div id="user-page">
            <h1>Welcome {user?.username}</h1>
            <button onClick={authGoogle}>Authorize Google Account</button>
            <br/>
            <br/>
            <label htmlFor="document-id-input">Document ID: </label>
            <input type="text" id="document-id-input"/>
            <button>Change</button>
            <p>Current Document ID: {user?.documentID}</p>
            <p>{user?.googleAccount.connected ? "Google Account Connected" : "Google Account Unlinked"}</p>
        </div>
    )

}
