import { createContext, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) =>{
    const [user, setUser] = useState (null);

    useEffect(() =>{
        const token = localStorage.getItem("token");
        if(token){
        const decoded = jwtDecode(token);
            setUser({
            token: userData.token,
            email: decoded.sub,
            id: decoded.id,
            cometchatUID: decoded.cometchatUID,
            });
        }
    },[]);

    const loginContext = (token) =>{
        const decoded = jwtDecode(token);
        localStorage.setItem("token", token);
        setUser({ token, ...decoded});
    };

    const logout = () =>{
        localStorage.removeItem("token");
        setUser(null);
    };


    return(
        <UserContext.Provider 
        value ={{user, setUser, loginContext, logout}}>{children}
        </UserContext.Provider>
    )
}