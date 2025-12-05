import {EmailShareButton, FacebookShareButton, TwitterShareButton, WhatsappShareButton} from "react-share";
import { EmailIcon, FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import './sharebutton.css'

//this component is used to create a share button for sharing event details on social media platforms.//
const ShareButton = ({eventId, url}) => {

    const shareURL = url || `http://localhost:8080/api/events/${eventId}`;
        
    return (
        <div className="share-button-container">
            <FacebookShareButton url={shareURL} className="share-button">
                <FacebookIcon size={32} round={true} />
            </FacebookShareButton>  
            <TwitterShareButton url={shareURL} className="share-button">
                <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton url={shareURL} className="share-button">
                <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <EmailShareButton url={shareURL} className="share-button">
                <EmailIcon size={32} round={true} />
            </EmailShareButton>

        </div>
    );
};
export default ShareButton; 