import { CometChat } from "@cometchat/chat-sdk-javascript";



const CometChatMessageComposer = ({ user, group }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    const receiverID = user ? user.getUid() : group.getGuid();
    const receiverType = user ? CometChat.RECEIVER_TYPE.USER : CometChat.RECEIVER_TYPE.GROUP;

    const textMessage = new CometChat.TextMessage(
      receiverID,
      message,
      receiverType
    );

    CometChat.sendMessage(textMessage).then(
      (msg) => {
        console.log("Message sent:", msg);
        setMessage("");
      },
      (error) => {
        console.error("Message sending failed:", error);
      }
    );
  };

  return (
    <div className="message-composer">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default CometChatMessageComposer;