import { useNavigate } from "react-router";
import { getItem } from "../../utils/localStorage";
import { useState } from "react";
import './Login.css'
import { CometChatUIKit } from "@cometchat/chat-uikit-react";

function Login () {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const storedUsers = Array.isArray(getItem('userData')) ? getItem('userData') : [];

    //create a function that alerts user of login status based on the stored email and password matching the localstorage data.//
    const handleSubmit = async (e) => {
        e.preventDefault();

        //this variable uses .find() to find the first matching element in the array. 
        const registeredUser = storedUsers.find(user => user.email === email && user.password === password);
        
        if (registeredUser){
            setMessage("Login Successful");
          
            const UID = registeredUser.id || registeredUser.uid || registeredUser.email;
    
            //This code was provided by CometChat to setup users. I modified the code so that CometChat could be used once the user logs into the app without having to do it twice. This way the system checks for the user by either id, uid, or email using the logical ( '||' ) symbol //
    CometChatUIKit.getLoggedinUser().then((user) => {
        if (!user) {
            // If no user is logged in, proceed with login
            CometChatUIKit.login(UID)
            .then((user) => {
                //console.log to test login//
                console.log("Login Successful:", { user });
                navigate('/Dashboard');
            })
            .catch((error) => {
                console.error("CometChat Login Error:", error);
                setMessage("Login error with chat service");
            });
        } else {
            navigate('/Dashboard');
        }
});
        }else{
            setMessage("Email or password is incalid");
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