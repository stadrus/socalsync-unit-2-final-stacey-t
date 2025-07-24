//Code provided by cometchat docs to intergrate CometChat API.//
import { Conversation, Group, User, CometChat} from "@cometchat/chat-sdk-javascript";
import { CometChatConversations, CometChatUIKitLoginListener } from "@cometchat/chat-uikit-react";
import { useEffect, useState } from "react";


const CometChatSelector = (props) => {
    const{
        onSelectorItemClicked = () => {},
        onHide = () => {},
        onNewChatClicked = () => {},
    } = props;

    const [LoggedinUser, setLoggedInUser] = useState(null);
    const [activateItem, setActivaeItem] = useState();

    useEffect(() =>{
        const LoggedinUser = CometChatUIKitLoginListener.getLoggedInUser();
        setLoggedInUser(LoggedinUser);
    }, []);

    return (
        <>
            {LoggedinUser && (
                <CometChatConversations activeConversation={activateItem instanceof CometChat.Conversation ? activateItem : undefined} 
                onItemClick={(e) =>{
                    setActivaeItem(e);
                    onSelectorItemClicked(e, "updateSelectedItem");
                }}
                />
            )}
        </>
    );
};

export default CometChatSelector;