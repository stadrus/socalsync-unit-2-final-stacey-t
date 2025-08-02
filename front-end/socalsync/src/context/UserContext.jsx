import { createContext, useState } from "react";
import { useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) =>{
    const [user, setUser] = useState (()=> {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    } );
    const [token, setToken] = useState (()=> localStorage.getItem('token') || '');

    useEffect(() =>{
        if(user && token){
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        } else{
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    },[user, token]);
    
    const loginContext = (userData) =>{
        localStorage.setItem('token', userData.storedToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

     const handleLogoutClick = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem('user');
        setUser(null)
    };
    
    return(
        <UserContext.Provider 
        value ={{user, setUser, loginContext, handleLogoutClick, setToken}}>{children}
        </UserContext.Provider>
    )
}