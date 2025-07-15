import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import './Register.css';


function Register () {
    // let data = JSON.stringify(user);
  
    //create user inputs using State// 
    const [name,setName]= useState ('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');

    // const storedUser = JSON.parse(localStorage.getItem(userData));
    // console.log(storedUser);//moved to login component//
    
    //create useState for userData to add new user in local storage in an array//
    const [userData, setUserData] = useState([]); 
    
    // localStorage.setItem('user', setUserData);
     
    //further research on localstorage propmt me to use, useEffect.//
    useEffect (() => {
       localStorage.setItem('userData', JSON.stringify(userData));
       console.log(userData);
    },[userData]);
   

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
    //useNavigate will navigate user to Login once registration in complete.//
    const navigate = useNavigate();
   //submit button should create a new user everytime someone registers an account//
    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {name, email, password}//should produce a new user//
        setUserData(prev=> [...prev, newUser]);
        
        if (name === '' || email === '' || password === ''){
            alert ("Profile in use.")
        } else {
            alert ("Registration Complete");
        }
       
        fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
            "x-api-key": "reqres-free-v1",
            "Content-Type": "application/json"
        },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => console.log(data));
        navigate('/Login');
    }
    return (
        <div className='register-wrapper'>
            <div className='register-box'>
                <div className="register-header">
                    <h1 className='register-title'>Register</h1>
                </div>
                <form id="register-form" onSubmit={handleSubmit}>
                <div>
                        <input className="input-box" id="name-user" placeholder='Enter Name' type="text" value={name} onChange={handleName}/><br></br>
                        <input className="input-box" id="email" placeholder='Enter Email' type="email"  value={email} onChange= {handleEmail}/><br></br>
                        <input className="input-box" id="current-password" placeholder="Enter Password" type="password" value={password} onChange={handlePassword}/><br></br>
                        <button className="submit-button" type="submit">Submit</button>
                </div>
                    </form>   
            </div>
        </div>
    );
};

export default Register;