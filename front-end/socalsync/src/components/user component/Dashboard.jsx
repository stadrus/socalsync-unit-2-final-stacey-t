import EventTable from "../event component/EventTable";
import ShareButton from './ShareButton'
import Chat from "../cometchat_component/Chat"
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import './dashboard.css'

const Dashboard = () => {
    const {user, handleLogoutClick} = useContext(UserContext);

    return(
        <div>
            <div className="dashboard-container">
                    <button className="logout-button" type='button' id="Logout" name="Logout" onClick={handleLogoutClick}>Logout</button>
                
                <section className="dashboard-hero">
                    <h1 className="dashboard-header">Welcome, {user.name}</h1>
                </section>
            
                <div className="dashboard-main">
                    <div className="dashboard-left">
                        <EventTable />
                        <div className="addtoany-container">
                        <ShareButton />
                        </div>
                    </div>

                    <div className="dashboard-right">
                        <Chat />
                    </div>

                </div>
            </div>
        </div>
    )
};

export default Dashboard; 
