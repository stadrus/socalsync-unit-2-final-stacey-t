import data from "../../data/mock-data.json";
import { Fragment, useState } from "react";
import { nanoid } from "nanoid";
import ReadRow from "./ReadRow";
import EditRow from "./EditRow";
import { setItem } from "../../utils/localStorage";
import usePersistedState from "../../hooks/usePersistedState";
import './eventTable.css';

//Using a table I will display the event details.//
// table complete added localstorage to store data. reference https://medium.com/@roman_j/mastering-state-persistence-with-local-storage-in-react-a-complete-guide-1cf3f56ab15c//
const EventTable = () =>{
    const [events, setEvents] = usePersistedState('events', data);

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

    const handleAddFormChange = (e) =>{
    e.preventDefault();
        
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
        
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    
    setAddFormData(newFormData);
    };

    const handleEditFormChange = (e) =>{
        e.preventDefault();
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
        
        setEditFormData(newFormData); 
    };
    
    const handleAddFormSubmit = (e) =>{
    e.preventDefault();

    const newEvent ={
        id: nanoid(),
        title: addFormData.title,
        details: addFormData.details,
        date: addFormData.date,
        };
        const newEvents = [...events, newEvent];
        setEvents(newEvents);
        setItem("events", newEvents);
    };

    const handleEditFormSubmit = (e) =>{
        e.preventDefault();

    const editedEvent ={
        id: editEventId,
        title: editFormData.title,
        details: editFormData.details,
        date: editFormData.date,
        };

        const newEvents = [...events];
        const index = events.findIndex((event)=>event.id === editEventId);

        newEvents[index] = editedEvent;
        setEvents(newEvents);
        setEditEventId(null);
        setItem("events", newEvents);
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
    const handleDeleteClick =(eventsId) =>{
        const newEvents = [...events];
        const index = events.findIndex((events)=> events.id === eventsId);
        newEvents.splice(index, 1);
        setEvents(newEvents);
        setItem("events", newEvents);
    };

    return (
        <div className="event-container">
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Event Title</th>
                            <th>Event Details</th>
                            <th>Event Date</th>
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
            <form onSubmit={handleAddFormSubmit}>
                <input 
                    type="text"
                    name="title"
                    required="required"
                    placeholder="Enter a event title"
                    onChange = {handleAddFormChange}/>
                <input 
                    type="text"
                    name="details"
                    required="required"
                    placeholder="Enter event details"
                    onChange = {handleAddFormChange}/>
                <input 
                    type='date'
                    name="date"
                    required="required"
                    placeholder="Enter a date"
                    onChange = {handleAddFormChange}/>
                <button type='submit'>Add</button>
            </form>
        </div>
    );

};
export default EventTable;