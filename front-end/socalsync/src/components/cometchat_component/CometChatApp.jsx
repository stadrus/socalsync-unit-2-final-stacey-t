
import { ConversationsWithMessages } from "@cometchat/chat-uikit-react";
import { UserContext } from "../../context/UserContext";
import { useState, useContext } from "react";
import { CometChat } from "@cometchat-pro/chat";
import { useEffect } from "react";

const CometChatApp = () => {
  const { user } = useContext(UserContext);
  const [ready, setReady] = useState(false);
  const [hasConversations, setHasConversations] = useState(null);

  useEffect(() => {
    CometChat.getLoggedInUser()
      .then((loggedInUser) => {
        if (!loggedInUser) {
          console.error("No user is logged in");
          return;
        }
        // Fetch conversations with a limit (e.g., 10)
        const conversationsRequest = new CometChat.ConversationsRequestBuilder()
          .setLimit(10)
          .build();

        conversationsRequest.fetchNext().then(
          (conversations) => {
            setHasConversations(conversations.length > 0);
            setReady(true);
          },
          (error) => {
            console.error("Error fetching conversations:", error);
            setHasConversations(false);
            setReady(true);
          }
        );
      })
      .catch((err) => {
        console.error("Error getting logged in user:", err);
      });
  }, [user]);

  if (!ready) return <div>Loading...</div>;

  if (!hasConversations) {
    return (
      <div style={{ padding: 20 }}>
        <h2>No conversations yet!</h2>
        <p>Start a new chat to connect with others.</p>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ConversationsWithMessages enablePresence={true} />
    </div>
  );
};

export default CometChatApp;