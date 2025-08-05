import { CometChat } from "@cometchat/chat-sdk-javascript";

const CometChatMessageList = ({ user, group }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user && !group) return;

    const listenerID = "message-listener";

    const id = user ? user.getUid() : group.getGuid();
    const type = user ? CometChat.RECEIVER_TYPE.USER : CometChat.RECEIVER_TYPE.GROUP;

    const limit = 50;
    const messagesRequest = new CometChat.MessagesRequestBuilder()
      .setUID(user?.getUid())
      .setGUID(group?.getGuid())
      .setLimit(limit)
      .build();

    messagesRequest.fetchPrevious().then(
      (fetchedMessages) => {
        setMessages(fetchedMessages);
      },
      (error) => {
        console.error("Message fetching failed:", error);
      }
    );

    // Listen for real-time messages
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (msg) => {
          setMessages((prev) => [...prev, msg]);
        },
        onMediaMessageReceived: (msg) => {
          setMessages((prev) => [...prev, msg]);
        },
      })
    );

    return () => {
      CometChat.removeMessageListener(listenerID);
    };
  }, [user, group]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.receiverType}`}>
          <strong>{msg.sender.name || msg.sender.uid}:</strong> {msg.text || "[Media]"}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default CometChatMessageList;