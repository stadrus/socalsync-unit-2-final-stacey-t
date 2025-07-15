import { useNavigate } from "react-router";
// import { useEffect } from "react";
import './Login.css'

function Login () {
    
    // useEffect(() =>{
    //       const data = localStorage.getItem('userData');
    //       if(data){
    //           setUserData(JSON.parse(data));
    //       }
    // }, []);

    const storedUser = JSON.parse(localStorage.getItem('userData'));
    console.log(storedUser);
   
    const navigate = useNavigate();

    //create a function that alerts user of login status based on the stored email and password matching the localstorage data.//
    const handleSubmit = () => {
        if (!storedUser.email === "" && !storedUser.password === ""){
            alert("Email or password is invalid");
        } else{
            alert ("Login Successful");
            navigate('/Dashboard');
        }
    };

    const handleClick = () =>{
        navigate('/Register')
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
                        <input className="input-box" type="email" placeholder="Enter Email"/>
                        <input className="input-box" type="password" placeholder="Enter Password"/>
                        <button className="submit-button" type="submit">Submit</button><br></br>
                        <button className="register-button" type="button" onClick={handleClick}>Register</button>
                    </div>
                    </form>
               </div>
            </div>
        </div>
    );
};

export default Login;