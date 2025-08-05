import { useNavigate } from 'react-router';
import { useState } from 'react';
import './Register.css';
import { COMETCHAT_CONSTANTS } from '../../cometchat.config';
import { CometChatUIKit } from '@cometchat/chat-uikit-react';


function Register () {
  
    //create user inputs using State// 
    const [name,setName]= useState ('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');

    // created a message state to replace js "alert" and add styling.
    const [message, setMessage] = useState('');
    
    //useNavigate will navigate user to Login once registration in complete.//
    const navigate = useNavigate();

    //create onChange elements for each key e.targt.value setStateName(key)
    const handleName = (e) =>{
        setName(e.target.value);
    }
    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }
     const handlePassword = (e) =>{
        setPassword(e.target.value);
    }
    
    //submit button should create a new user everytime someone registers an account//
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (name === '' || email === '' || password === ''){
            setMessage("Please fill in all fields");
            return;
        }
        
        try{
            const response = await fetch("http://localhost:8080/api/user/register",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({name, email, password})
            });
            
            if(!response.ok){
                throw new Error("Failed to register with backend");
            }
            const user = await response.json();
            const UID = user.cometchatUID;


            const newCometUser = new CometChat.User(UID);
            newCometUser.setName(user.name);

            try{
                await CometChatUIKit.login(UID, COMETCHAT_CONSTANTS.AUTH_KEY)
            } catch (error) {
                console.error("CometChat login failed:", error);
                setMessage("Registration succeeded, but chat login failed.");
                return;
            }

            setMessage("Registration complete");
            navigate('/Login');

        } catch (error){
            console.error("Registration failed:", error);
            setMessage('Registration failed');
        }
        
    };
    return (
        <div className='register-wrapper'>
            <div className='register-box'>
                <div className="register-header">
                    <h1 className='register-title'>Register</h1>
                </div>
                <form id="register-form" onSubmit={handleSubmit}>
                <div>
                        <input 
                        className="input-box" 
                        id="name-user" 
                        placeholder='Enter Name' 
                        type="text" 
                        value={name} 
                        onChange={handleName}/><br></br>

                        <input 
                        className="input-box" 
                        id="email" 
                        placeholder='Enter Email' 
                        type="email"  
                        value={email} 
                        onChange= {handleEmail}/><br></br>

                        <input 
                        className="input-box" 
                        id="current-password" 
                        placeholder="Enter Password" 
                        type="password" 
                        value={password} 
                        onChange={handlePassword}/><br></br>

                        <button className="submit-button" type="submit">Submit</button>
                        {message && <p className='form-message'>{message}</p>}
                </div>
                    </form>   
            </div>
        </div>
    );
};

export default Register;