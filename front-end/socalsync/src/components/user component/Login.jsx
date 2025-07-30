import { useNavigate } from "react-router";
import { useState } from "react";
import './Login.css'
import { CometChatUIKit } from "@cometchat/chat-uikit-react";

function Login () {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    //create a function that alerts user of login status based on the stored email and password matching the localstorage data.//
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify({email,password})
            });
            if(!response.ok){
                throw new Error('Invaild login');
            }

            const user = await response.json();
            const UID = user.email;

            const cometUser = await CometChatUIKit.getLoggedinUser();
            if(!cometUser){
                await CometChatUIKit.login(UID);
            }
            navigate('/Dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            setMessage('Login failed');
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
                        />
                        
                        <input 
                        className="input-box" 
                        type="password" 
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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