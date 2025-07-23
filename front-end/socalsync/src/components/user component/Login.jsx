import { useNavigate } from "react-router";
import { getItem } from "../../utils/localStorage";
import { useState } from "react";
import './Login.css'

function Login () {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const storedUsers = getItem('userData') || [];
    const [message, setMessage] = useState('');

   

    //this variable uses .find() to find the first matching element in the array. 
    const registerdUser = storedUsers.find(user => user.email === email && user.password === password);

    //create a function that alerts user of login status based on the stored email and password matching the localstorage data.//
    const handleSubmit = (e) => {
        e.preventDefault();
        if (registerdUser){
            setMessage("Email or password is invalid");
        } else{
            setMessage("Login Successful");
            navigate('/Dashboard');
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
                        <button className="register-button" type="button" onClick={handleClick}>Register</button> {message && <p className="form-message">{message}</p>}
                    </div>
                    </form>
               </div>
            </div>
        </div>
    );
};

export default Login;