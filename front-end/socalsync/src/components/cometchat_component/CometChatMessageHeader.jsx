import { CometChat } from "@cometchat/chat-sdk-javascript";
import './CometChatMessageHeader.css'

const CometChatMessageHeader = ({ user, group }) => {
  const isUser = !!user;
  const name = isUser ? user.name : group?.name;
  const avatar = isUser ? user.avatar : group?.icon;
  const status = isUser
    ? user.status === CometChat.USER_STATUS.ONLINE
      ? "Online"
      : "Offline"
    : "";

  return (
    <div className="message-header">
      <img
        src={avatar || "https://www.gravatar.com/avatar/?d=mp"}
        alt={name}
        className="avatar"
      />
      <div className="user-info">
        <div className="name">{name}</div>
        {isUser && <div className="status">{status}</div>}
      </div>
    </div>
  );
};

export default CometChatMessageHeader;