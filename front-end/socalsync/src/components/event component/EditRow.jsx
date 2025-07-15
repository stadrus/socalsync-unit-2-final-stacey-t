//this component uses props to handle the form change whenever the user eidits the data.//
const EditRow = ({editFormData, handleEditFormChange, handleCancelClick}) => {
    return (
        <tr>
            <td>
                <input 
                type="text"
                name="title"
                required="required"
                placeholder="Enter a event title"
                value={editFormData.title}
                onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <input 
                type="text"
                name="details"
                required="required"
                placeholder="Enter a event details"
                value={editFormData.detail}
                onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <input 
                type='date'
                name="date"
                required="required"
                placeholder="Enter a event date"
                value={editFormData.date}
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