
import { ConversationsWithMessages } from "@cometchat/chat-uikit-react";

const CometChatApp = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ConversationsWithMessages enablePresence={true} />
    </div>
  );
};

export default CometChatApp;
