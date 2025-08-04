//this component uses props to handle the form change whenever the user eidits the data.//
const EditRow = ({editFormData, handleEditFormChange, handleCancelClick}) => {
    return (
        <tr>
            <td>
                <input 
                type="text"
                name="title"
                required="required"
                placeholder="Event title"
                value={editFormData.title}
                onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <input 
                type="text"
                name="details"
                required="required"
                placeholder="Event details"
                value={editFormData.details}
                onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <input 
                type= "datetime-local"
                name="date"
                required="required"
                placeholder="Event date"
                value={editFormData.date}
                onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <input 
                type= "text"
                name="location"
                required="required"
                placeholder="Event Location"
                value={editFormData.location}
                onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <button type='submit'>Save</button>
                <button type='button' onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    );
};
export default EditRow;