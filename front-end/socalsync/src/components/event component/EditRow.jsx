//this component uses props to handle the form change whenever the user eidits the data.//
const EditRow = ({editFormData, handleEditFormChange, handleCancelClick}) => {
    return (
        <div className="edit-event-card">
            <div className="edit-card-field">
                <label>Title</label>
                <input 
                type="text"
                name="title"
                required="required"
                placeholder="Event title"
                value={editFormData.title || ""}
                onChange = {handleEditFormChange}
                ></input>
            </div>
        
            <div className="edit-card-field">
            <label>Description</label>
                <input 
                type="text"
                name="description"
                required="required"
                placeholder="Event details"
                value={editFormData.description || ""}
                onChange = {handleEditFormChange}
                ></input>
            </div>

            <div className="edit-card-field">
            <label>Date</label>
                <input 
                type= "datetime-local"
                name="date"
                required="required"
                placeholder="Event date"
                value={editFormData.date || ""}
                onChange = {handleEditFormChange}
                ></input>
            </div>
            <div className="edit-card-field">
            <label>Location</label>
                <input 
                type= "text"
                name="location"
                required="required"
                placeholder="Event Location"
                value={editFormData.location || ""}
                onChange = {handleEditFormChange}
                ></input>
            </div>
            <div className="edit-card-actions">
                <button type='submit'>Save</button>
                <button type='button' onClick={handleCancelClick}>Cancel</button>
            </div>
        </div>
    );
};
export default EditRow;