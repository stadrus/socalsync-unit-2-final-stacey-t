import { useContext, useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";

import CometChatSelector from "./CometChatSelector";
import CometChatMessageHeader from "./CometChatMessageHeader";
import CometChatMessageList from "./CometChatMessageList";
import CometChatMessageComposer from "./CometChatMessageComposer";
import { UserContext } from "../../context/UserContext";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";
import { useNavigate } from "react-router";
import CometChatWidgetLoader from "./CometChatWidgetLoader";

const Chat = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    CometChatUIKit.getLoggedinUser()
    .then((user) => {
      if(!user){
        console.warn("User not logged into CometChat. Redirecting...")
        navigate('/Login')
      }
    })
    .catch ((error) => {
      console.error("CometChat error:", error);
      navigate('/Login')
    });
  },[]);

  const handleClick = (activeItem) => {
    let item = activeItem;

    if (activeItem instanceof CometChat.Conversation) {
      item = activeItem.getConversationWith();
    }

    if (item instanceof CometChat.User) {
      setSelectedUser(item);
      setSelectedGroup(null);
    } else if (item instanceof CometChat.Group) {
      setSelectedUser(null);
      setSelectedGroup(item);
    } else {
      setSelectedUser(null);
      setSelectedGroup(null);
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>
            <button onClick={() => window.CometChatWidget.openChat(cometchatUID, user)}>
              Chat
            </button>
          {user?.cometchatUID && <CometChatWidgetLoader uid = {user.cometchatUID} />} 
      <div className="conversations-with-messages">
        <div className="conversations-wrapper">
          <CometChatSelector onSelectorItemClicked={handleClick} />
        </div>
        {selectedUser || selectedGroup ? (
          <div className="messages-wrapper">
            <CometChatMessageHeader user={selectedUser} group={selectedGroup} />
            <CometChatMessageList user={selectedUser} group={selectedGroup} />
            <CometChatMessageComposer user={selectedUser} group={selectedGroup} />
          </div>
        ) : (
          <div className="empty-conversation">Select a conversation to start</div>
           )}
      </div>
    </div>
  );
};

export default Chat;
