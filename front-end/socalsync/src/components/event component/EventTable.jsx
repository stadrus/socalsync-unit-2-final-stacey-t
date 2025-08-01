import { Fragment, useContext, useEffect, useState } from "react";
import ReadRow from "./ReadRow";
import EditRow from "./EditRow";
import './eventTable.css';
import { UserContext } from "../../context/UserContext";

//Using a table I will display the event details.//

const EventTable = () =>{
    const {user} = useContext (UserContext);
    const userId = user?.id;

    const [events, setEvents] = useState([]);

    const [addFormData, setAddFormData] =useState({
    title:"",
    details:"",
    date:"",
    });

    const [editFormData, setEditFormData] = useState({
    title:"",
    details:"",
    date:"",
    });

    const [editEventId, setEditEventId] = useState(null);

    useEffect(() => {
        const fetchEvents = async () =>{
            try{
                

                const response = await fetch(`http://localhost:8080/api/events/user/${userId}`);
                const data = await response.json();
                setEvents (data);
            } catch (error){
                console.error("Faild to fetch events:", error);
            }
        };
        fetchEvents();
    }, [userId]);

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
        };

        try{
            const response = await fetch(`http://localhost:8080/api/events/user/${userId}`,{
                method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(newEvent),
            });

            if(!response.ok) throw new Error("Faild to add event");

            const savedEvent = await response.json();

            setEvents((previousState) => [...previousState, savedEvent]);
            setAddFormData({title:"", details:"", date:""})
        }catch (error) {
            console.error("Add event failed:", error);
        }
       
    };

    const handleEditFormSubmit = async (e) =>{
        e.preventDefault();

    const editedEvent ={
        id: editEventId,
        title: editFormData.title,
        details: editFormData.details,
        date: editFormData.date,
        };

        try{
            const response = await fetch(`http://localhost:8080/api/events/${editEventId}`,{
                method: "PUT",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(editedEvent),
            });
            if(!response.ok) throw new Error("Faild to edit event");

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
            });
            if(!response.ok) throw new Error("Faild to delete event");

          setEvents((previousState) => previousState.filter((e) => e.id !== eventId));
            setEditEventId(null);
        }catch (error) {
            console.error("Deleted event failed:", error);
        }
    };

    return (
        <div className="event-container">
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Event Title</th>
                            <th>Event Details</th>
                            <th>Event Date and Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {events.map((event) =>(
                        <Fragment key={event.id}>
                        {editEventId === event.id ? ( <EditRow editFormData ={editFormData} handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                        />) : (<ReadRow event={event} handleEditClick = {handleEditClick} handleDeleteClick ={handleDeleteClick}/>)}
                        </Fragment> 
                    ))}
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
                <button type='submit'>Add</button>
            </form>
        </div>
    );

};
export default EventTable;