import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




function Profile(props) {

        const {handleLogoutClick} = useContext(UserContext);

  return (
      <div className="profile-card">
      <FontAwesomeIcon icon={faUser} className="profile-image" />
      <p className="profile-name"> Name: {props.username} </p>
      <p className="profile-birthdate"> Birthday: {props.birthday} </p>
      <p className="profile-location"> Location:{props.userlocation} </p>
      <p className="profile-text"> {props.userDescription} </p>
      <h4 className="profile-hub">My Hubs</h4>
      <ul>
        <p>One</p>
        <p>Two</p>
        <p>Three</p>
      </ul>

      {/* <ul className="profile-hub-list">
        {props.hubs && props.hubs.map((hub, index) => (
          <li key={index} className="profile-hub-item">{hub}</li>
        ))}
      </ul> */}
      
       <button className="edit-profile-button" type='button' id="EditProfile" name="EditProfile">Edit Profile</button>
       <button className="logout-button" type='button' id="Logout" name="Logout" onClick={handleLogoutClick}>Logout</button>
    </div>

  );
}
export default Profile;