import ShareButton from "../user component/ShareButton";

//using props to pass in the event information will help edit the row data//
const ReadRow = ({ event, handleEditClick, handleDeleteClick }) =>{
    const formatDate = (iso) => {
        if(!iso) return "";
        return new Date (iso).toLocaleString([], {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };
    const handleCopyToClipBoardClick = async () => {
        try {
            await navigator.clipboard.writeText(`http://localhost:8080/api/events/${event.id}`);    
            alert ("Event link copied to clipboard!");
        } catch (err) {
            console.error ("Failed to copy: ", err);
        }
    };

    return(
        <div className="read-row-card">
            <h3 className="event-title">{event.title}</h3>
            <p className="event-description">{event.description}</p>
            <p>{formatDate(event.date)}</p>
            <p>{event.location}</p>
            <div className="event-actions">
                <button type='button' onClick={(e)=> handleEditClick (e,event)}>Edit</button>
                <button type='button' onClick={()=> handleDeleteClick (event.id)}>Delete</button>
                <button className="share-button" onClick={() => handleCopyToClipBoardClick(event.id)}> Copy Link </button>
                <ShareButton url={`http://localhost:8080/api/events/${event.id}`} />
            </div>
        </div>
    );
};

export default ReadRow;