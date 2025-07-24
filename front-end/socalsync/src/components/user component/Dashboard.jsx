import { useNavigate } from "react-router";
import EventTable from "../event component/EventTable";
import ShareButton from './ShareButton'
import './dashboard.css'
import Chat from "../cometchat component/Chat";

const Dashboard = () => {

    const navigate = useNavigate();
    const handleLogoutClick = () => {
    navigate ('../Home');
    };
    
    return(
        <div className="dashboard-container">
        <div className="dashboard-wrapper">
            <header className="dasboard-header">
                <button className="logout-button" type='button' id="Logout" name="Logout" onClick={handleLogoutClick}>Logout</button>
            </header>
            <section className="dashboard-hero">
                <h1 className="dashboard-header">Welcome to your Dashboard</h1>
            </section>
            <article className="dashboard-events">
            <EventTable />
            </article>
            <div className="sharebutton-wrapper">
            <ShareButton />
            </div>
            <div className="chat-box">
                <Chat />
            </div>
        </div>
        </div>
    )
};

export default Dashboard; 
