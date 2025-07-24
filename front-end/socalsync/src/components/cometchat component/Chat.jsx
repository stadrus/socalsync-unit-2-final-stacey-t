import CometChatSelector from "./CometChatSelector";

const Chat = () => {
    const handleClick = (item, type) => {
        console.log("Item clicked:", item, "Type:", type);
    }

    return (
        <div className="chat-container">
            <h2>Chat</h2>
            <CometChatSelector onSelectorItemClicked = {handleClick} />
        </div>
    );
};

export default Chat;