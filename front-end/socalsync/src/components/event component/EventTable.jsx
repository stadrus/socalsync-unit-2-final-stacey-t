import { Fragment, useContext, useEffect, useState } from "react";
import ReadRow from "./ReadRow";
import EditRow from "./EditRow";
import './eventTable.css';
import { UserContext } from "../../context/UserContext";

//Using a table I will display the event details.//

const EventTable = () =>{

    const {user, token} = useContext (UserContext);
    const [events, setEvents] = useState([]);
    
    
    const [addFormData, setAddFormData] =useState({
    title:"",
    description:"",
    date:"",
    location: "",
    });

    const [editFormData, setEditFormData] = useState({
    title:"",
    description:"",
    date:"",
    location: "",
    });

    const [editEventId, setEditEventId] = useState(null);

    useEffect(() => {
        const fetchEvents = async () =>{
            try{
                
                const response = await fetch(`http://localhost:8080/api/events/user`, {
                    method: "GET",
                    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                });
            
                if(!response.ok){
                    const errorText = await response.text();
                    console.error("Fetch failed:", response.status, errorText);
                    throw new Error("Failed to fetch events")
                }

                const data = await response.json();
                const normalize = data.map(ev => ({
                    ...ev, id: ev.eventId,
                }));

                setEvents(normalize);
            } catch (error) {
                console.error("Faild to fetch events:", error);

            }
        };
        if(user && token) fetchEvents();
    }, [user, token]);

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
        description: addFormData.description,
        date: addFormData.date,
        location: addFormData.location,
        };

        try{
            const response = await fetch(`http://localhost:8080/api/events/user`,{
                method: "POST",
                headers: {"Content-Type":"application/json", "Authorization": `Bearer ${token}`, },
                body: JSON.stringify(newEvent),
            });

            if(!response.ok) throw new Error("Failed to add event");

            const createEvent = await response.json();

            setEvents((previousState) => [...previousState, {...createEvent, id: createEvent.eventId}]);
            setAddFormData({title:"", description:"", date:"", location: ""})
        }catch (error) {
            console.error("Add event failed:", error);
        }
       
    };

    const handleEditFormSubmit = async (e) =>{
        e.preventDefault();
    
    const editedEvent ={
        title: editFormData.title,
        description: editFormData.description,
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
            const normalize = {...updated, id: updated.id || updated.eventId};

            setEvents((previousState) => 
                previousState.map((ev) => 
                    (ev.id === normalize.id ? normalize : ev))
        );
        setEditEventId(null)
        }catch (error) {
            console.error("Updated event failed:", error);
        }
    };
    

    const handleEditClick = (e, event) =>{
        e.preventDefault();

        const eventId = event.id || event.eventId;
        setEditEventId(eventId);

        if(!eventId){
            console.error("Edit clicked ")
        }

        const formValues = {
        title: event.title || "",
        description: event.description || "",
        date: event.date ? event.date.slice(0, 10) : "",
        location: event.location || "",
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
                        const id = event.id || event.eventId;
                        if (!id) console.warn("Missing event ID", event)
                     return editEventId === id ? (
                        <EditRow
                        key={id}
                        editFormData ={editFormData} 
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                        />
                        ) : (
                            <ReadRow 
                            key = {id}
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
                    value={addFormData.title || ""}
                    onChange = {handleAddFormChange}/>
                <input 
                    type="text"
                    name="description"
                    required="required"
                    placeholder="Enter event description"
                    value={addFormData.description || ""}
                    onChange = {handleAddFormChange}/>
                <input 
                    type="date"
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
                    value={addFormData.location || ""}
                    onChange = {handleAddFormChange}/>
                <button type='submit'>Add</button>    
            </form>
        </div>
    );

};
export default EventTable;