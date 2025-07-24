import { useState } from "react";
import CometChatSelector from "./CometChatSelector";
import { CometChatMessageComposer, CometChatMessageHeader, CometChatMessageList } from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import "./chat.css"

const Chat = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleClick = (activeItem) => {
        //used let because item needs to be mutable.//
        let item = activeItem;
    
    //used if statement to conversation
    if(activeItem instanceof CometChat.Conversation){
        item = activeItem.getConversationWith();
    }
    
    if (item instanceof CometChat.User){
        setSelectedUser(item);
        setSelectedGroup(null);
    } else if (item instanceof CometChat.Group){
        setSelectedUser(null);
        selectedGroup(item);
    } else {
        setSelectedUser(null)
        setSelectedGroup(null);
    }
    }


    return (
        <div className="chat-container">
            <h2>Chat</h2>
            <div className="conversations-with-messages">
                <div className="conversations-wrapper">
                    <CometChatSelector onSelectorItemClicked = {handleClick} />
                </div>
                {selectedUser || selectedGroup ? (
                <div className="messages-wrapper">
                    <CometChatMessageHeader user={selectedUser} group={selectedGroup} />
                    <CometChatMessageList user={selectedUser} group={selectedGroup}/>
                    <CometChatMessageComposer user={selectedUser} group={selectedGroup}/>
                </div>
                ): (
                    <div className="empty-conversation"> Select Conversation to start</div>
                )}
            </div>
        </div>
    );
};

export default Chat;