//Code provided by cometchat docs to intergrate CometChat API.//
import { CometChat} from "@cometchat/chat-sdk-javascript";
import { CometChatConversations } from "@cometchat/chat-uikit-react";
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
        CometChat.getLoggedInUser().then(user =>{
            setLoggedInUser(user);
        }).catch(error => {
            console.log("Error fetching logged in user", error)
        });
    }, []);

    return (
        <>
        <div>
            {LoggedinUser && (
                <CometChatConversations activeConversation={activeItem instanceof CometChat.Conversation ? activeItem : undefined} 
                onItemClick={(item) =>{
                    setActiveItem(item);
                    onSelectorItemClicked(item, "updateSelectedItem");
                }}
                />
            )}
        </div>
        </>
    );
};

export default CometChatSelector;