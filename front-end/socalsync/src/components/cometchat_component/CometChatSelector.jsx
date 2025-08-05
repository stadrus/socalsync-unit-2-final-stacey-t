//Code provided by cometchat docs to intergrate CometChat API.//
import { CometChatConversations, CometChatUIKit } from "@cometchat/chat-uikit-react";
import { useEffect, useState } from "react";


const CometChatSelector = (props) => {
    const{
        onSelectorItemClicked = () => {},
        onHide = () => {},
        onNewChatClicked = () => {},
    } = props;

    const [LoggedinUser, setLoggedInUser] = useState(null);
    const [activeItem, setActiveItem] = useState();

    useEffect(() =>{
        CometChatUIKit.getLoggedinUser()
        .then((user) => {
            setLoggedInUser(user);
        })
        .catch((error) => {
            console.error("Error fetching logged in user", error);
        });
    }, []);

    return (
        <div>
            {LoggedinUser ? (
                <CometChatConversations activeConversation = {activeItem} 
                onItemClick={(item) => {
                    setActiveItem(item);
                    onSelectorItemClicked(item, "updateSelectedItem");
                }}
                />
            ) : (
                <p>Loading Conversations...</p>
            )}
        </div>
    );
};

export default CometChatSelector;