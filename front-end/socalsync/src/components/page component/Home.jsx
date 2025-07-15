import { useNavigate } from "react-router";
import "./home.css"
import logo from "../../images/logo.svg";

const Home = () =>{
    const navigate = useNavigate();
    const handleClick1 = () => {
        navigate ('/Login');
    }
    const handleClick2 = () => {
        navigate('/Register');
    }

    return (
        <div className="home">
        <div className="background-container">
          <span> </span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="home-container">
        <div><img className="home-logo" src={logo} alt="SoCalSync Logo"></img></div>
        <div className="home-header"><h3>The social calendar</h3></div>
            <button className="login-button" type="button" onClick={handleClick1}>Login</button><br></br>
            <button className="register-button" type="button" onClick={handleClick2}>Register Account</button>
        </div>
        </div>
    );
};

export default Home;