import EventTable from "../event component/EventTable";
import ShareButton from './ShareButton'
import Chat from "../cometchat component/Chat";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import './dashboard.css'

const Dashboard = () => {
    const {user, handleLogoutClick} = useContext(UserContext);

    return(
        <div>
        <div className="dashboard-container">
        <div className="dashboard-wrapper">
            <header className="dasboard-header">
                <button className="logout-button" type='button' id="Logout" name="Logout" onClick={handleLogoutClick}>Logout</button>
            </header>
            <section className="dashboard-hero">

                <h1 className="dashboard-header">Welcome, {user.name}</h1>
            </section>
        </div>
        </div>
            <article className="dashboard-events">
            <EventTable />
            </article>
            <div className="addtoany-container">
                <ShareButton />
            </div>
            <div className="chat-box">
                <Chat />
            </div>
        </div>
    )
};

export default Dashboard; 
