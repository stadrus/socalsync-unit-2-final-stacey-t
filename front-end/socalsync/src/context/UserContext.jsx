import { createContext, useState } from "react";
import { useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) =>{
    const [user, setUser] = useState (()=> {
        try{
            const savedUser = localStorage.getItem('user');
            return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;

        }catch (e){
            console.error("Failed to parse user from localStorage:", e);
            return null;
        }
    } );

    const [token, setToken] = useState (()=> localStorage.getItem('token') || '');

    useEffect(() =>{
        if(user && token){
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        } else{
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    },[user, token]);
    
    const loginContext = ({user: storedUser, storedToken}) =>{
        setUser(storedUser);
        setToken(storedToken);
        localStorage.setItem('user', JSON.stringify(storedUser));
        localStorage.setItem('token', storedToken);
    };

     const handleLogoutClick = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem('user');
        setUser(null);
        setToken('');
    };

    
    return(
        <UserContext.Provider 
        value ={{user, token, setUser, loginContext, handleLogoutClick, setToken}}>{children}
        </UserContext.Provider>
    )
}