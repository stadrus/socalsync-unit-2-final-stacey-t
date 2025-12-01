
//using props to pass in the event information will help edit the row data//
const ReadRow = ({ event, handleEditClick, handleDeleteClick }) =>{
    const formatDate = (iso) => {
        if(!iso) return "";
        return new Date (iso).toLocaleString([], {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
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
            </div>
        </div>
    );
};

export default ReadRow;