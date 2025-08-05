import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";
import {COMETCHAT_CONSTANTS} from '../../cometchat.config'
import './Login.css'

function Login () {
    const navigate = useNavigate();
    const {loginContext} =useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    //create a function that alerts user of login status based on the stored email and password matching the localstorage data.//
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try{
            const response = await fetch("http://localhost:8080/api/user/login", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({ email, password})
            });
            
            if(!response.ok){
                throw new Error('Invalid login');
            }

            const data = await response.json();
            if(!data.token){
                throw new Error ("No token returned from backend")
            }

            loginContext({user: data.user, storedToken: data.token});
            
            const UID = jwtDecode(data.token).cometchatUID;
            
            const cometUser = await CometChat.getLoggedinUser();
            if(!cometUser || cometUser.uid !== UID){
                await CometChat.logout();
                await CometChat.login(UID, COMETCHAT_CONSTANTS.AUTH_KEY);
            } 
        navigate('/Dashboard');
        } catch (error) {
                console.error('Login failed:', error);
                setMessage('Login failed, please check credentials');
            }
    };

    const handleClick = () =>{
        navigate('/Register');
    };

    return (
        <div className= "login-wrapper">
            <div className="login-box">
                <div className="login-header">
                    <h3 className="login-title">Login</h3>
                </div>
               <div>
                    <form id="login-form" onSubmit={handleSubmit}>
                    <div>
                        <input 
                        className="input-box" 
                        type="email" 
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                        
                        <input 
                        className="input-box" 
                        type="password" 
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required
                        />
                        <button className="submit-button" type="submit">Submit</button><br></br>
                        <button className="register-button" type="button" onClick={handleClick}>Register</button> 
                        {message && <p className="form-message">{message}</p>}
                    </div>
                    </form>
               </div>
            </div>
        </div>
    );
};

export default Login;