import EventTable from "../event component/EventTable";
import './dashboard.css'
import Profile from "./Profile";

const Dashboard = () => {

    return(
        <>
            <div className="dashboard-container">
                <div className="dashboard-left">
                    <Profile />
                </div>               
                <div className="dashboard-right">
                    <EventTable />
                </div>
            </div>
        </>
    )
};

export default Dashboard; 
