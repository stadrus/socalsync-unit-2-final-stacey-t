import { useContext, useEffect, useState } from "react";
import ReadRow from "./ReadRow";
import EditRow from "./EditRow";
import './eventTable.css';
import { UserContext } from "../../context/UserContext";

//Using a table I will display the event details.//

const EventTable = () =>{

    const {user, token} = useContext (UserContext);
    const userId = user?.id;

    const [events, setEvents] = useState([]);

    const [addFormData, setAddFormData] =useState({
    title:"",
    details:"",
    date:"",
    location: "",
    });

    const [editFormData, setEditFormData] = useState({
    title:"",
    details:"",
    date:"",
    location: "",
    });

    const [editEventId, setEditEventId] = useState(null);

    useEffect(() => {
        const fetchEvents = async () =>{
            try{
                
                const response = await fetch(`http://localhost:8080/api/events/user/${userId}`, {
                    method: "GET",
                    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                });
            
                if(!response.ok){
                    const errorText = await response.text();
                    console.error("Fetch failed:", response.status, errorText);
                    throw new Error("Failed to fetch events")
                }

                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error("Faild to fetch events:", error);

            }
        };
        if(userId && token) fetchEvents();
    }, [userId, token]);

    const handleAddFormChange = (e) =>{
        const {name, value} = e.target;
    setAddFormData((previousState) => ({...previousState, [name]: value}));  
    };

    const handleEditFormChange = (e) =>{
        const {name, value} = e.target;
    setEditFormData((previousState) => ({...previousState, [name]: value}));
    };
    
    const handleAddFormSubmit = async (e) =>{
    e.preventDefault();
    const newEvent ={
        title: addFormData.title,
        details: addFormData.details,
        date: addFormData.date,
        location: addFormData.location,
        };

        try{
            const response = await fetch(`http://localhost:8080/api/events/user/${userId}`,{
                method: "POST",
                headers: {"Content-Type":"application/json", "Authorization": `Bearer ${token}`, },
                body: JSON.stringify(newEvent),
            });

            if(!response.ok) throw new Error("Failed to add event");

            const createEvent = await response.json();
            setEvents((previousState) => [...previousState, createEvent]);
            setAddFormData({title:"", details:"", date:"", location: ""})
        }catch (error) {
            console.error("Add event failed:", error);
        }
       
    };

    const handleEditFormSubmit = async (e) =>{
        e.preventDefault();

    const editedEvent ={
        title: editFormData.title,
        details: editFormData.details,
        date: editFormData.date,
        location: editFormData.location,
        };

        try{
            const response = await fetch(`http://localhost:8080/api/events/${editEventId}`,{
                method: "PUT",
                headers: {"Content-Type":"application/json", "Authorization": `Bearer ${token}`},
                body: JSON.stringify(editedEvent),
            });
            if(!response.ok) throw new Error("Failed to edit event");

            const updated = await response.json();

            setEvents((previousState) => previousState.map((ev) => ev.id === updated.id ? updated : ev));
            setEditEventId(null);
        }catch (error) {
            console.error("Updated event failed:", error);
        }
    };
    

    const handleEditClick = (e, event) =>{
        e.preventDefault();
        setEditEventId(event.id);
        const formValues = {
        title: event.title,
        details: event.details,
        date: event.date,
        location: event.location,
        };
        setEditFormData(formValues);
    };
    const handleCancelClick = () =>{
        setEditEventId(null);
    };


    const handleDeleteClick = async (eventId) =>{
        try{
            const response = await fetch(`http://localhost:8080/api/events/${eventId}`,{
                method: "DELETE",
                headers: {"Content-Type":"application/json", "Authorization": `Bearer ${token}` },
                
            });
            if(!response.ok) throw new Error("Failed to delete event");

          setEvents((previousState) => previousState.filter((e) => e.id !== eventId));
            setEditEventId(null);
        }catch (error) {
            console.error("Deleted event failed:", error);
        }
    };

    return (
        <div className="event-container">
            <form className= "edit-form"onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Event Title</th>
                            <th>Event Details</th>
                            <th>Event Date and Time</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {events.map((event) => {
                        if (!event.id) console.warn("Missing event ID", event)
                     return editEventId === event.id ? (
                        <EditRow
                        key={event.id}
                        editFormData ={editFormData} 
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                        />
                        ) : (
                            <ReadRow 
                            key = {event.id}
                            event={event}
                            handleEditClick = {handleEditClick} 
                            handleDeleteClick ={handleDeleteClick}/>)
                    })}
                    </tbody>
                </table>
            </form>

            <h2>Add Event</h2>
            <form  className ="add-form" onSubmit={handleAddFormSubmit}>
                <input 
                    type="text"
                    name="title"
                    required="required"
                    placeholder="Enter a event title"
                    value={addFormData.title}
                    onChange = {handleAddFormChange}/>
                <input 
                    type="text"
                    name="details"
                    required="required"
                    placeholder="Enter event details"
                    value={addFormData.details}
                    onChange = {handleAddFormChange}/>
                <input 
                    type="datetime-local"
                    name="date"
                    required="required"
                    value={addFormData.date}
                    placeholder="Enter a date and start time"
                    onChange = {handleAddFormChange}/>
                <input 
                    type="text"
                    name="location"
                    required="required"
                    placeholder="Enter a event location"
                    value={addFormData.location}
                    onChange = {handleAddFormChange}/>
                <button type='submit'>Add</button>    
            </form>
        </div>
    );

};
export default EventTable;