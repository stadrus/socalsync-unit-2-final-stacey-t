import { useNavigate } from 'react-router';
import { useState } from 'react';
import './Register.css';
import { COMETCHAT_CONSTANTS } from '../../cometchat.config';
import { CometChat } from '@cometchat/chat-sdk-javascript';

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
            const response = await fetch('http://localhost:8080/api/auth/register',{
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({name,email,password})
            });

            if(!response.ok){
                throw new Error("Failed to register with backend");
            }

            const user = await response.json();

            const cometChatUser = new CometChat.User(user.email);
            cometChatUser.setName(user.name);

            await CometChat.createUser(cometChatUser, COMETCHAT_CONSTANTS.AUTH_KEY);

            setMessage("Registration complete");
            navigate('/Login');
        } catch (error){
            console.error('Registration error:', error);
            setMessage('Registration failed');
        }
        const emailExists = userData.find(user => user.email === email);
        if(emailExists){
            setMessage("Email already registered.");
            return;
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