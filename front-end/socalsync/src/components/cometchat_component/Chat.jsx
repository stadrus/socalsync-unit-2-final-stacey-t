import CometChatApp from "./CometChatApp";

const Chat = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <CometChatApp />
      <div id="chat-container"></div>
    </div>
    
  );
};

export default Chat;