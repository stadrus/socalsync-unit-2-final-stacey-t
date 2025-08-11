import { CometChatUIKit, UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";
import { COMETCHAT_CONSTANTS } from "../../cometchat.config";
import { CometChat } from "@cometchat-pro/chat";

const initCometChat = async () => {
  try {
    await CometChat.init(
      COMETCHAT_CONSTANTS.APP_ID,
      new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion(COMETCHAT_CONSTANTS.REGION)
        .build()
    );
    const UIKitSettings = new UIKitSettingsBuilder()
    .setAppId(COMETCHAT_CONSTANTS.APP_ID) 
    .setRegion(COMETCHAT_CONSTANTS.REGION) 
    .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY) 
    .subscribePresenceForAllUsers() 
    .build(); 

    await CometChatUIKit.init(UIKitSettings)
      console.log("CometChat UI Kit initialized successfully.");
  } catch (error){
    console.error("CometChat UI Kit initialization failed:", error); 
  };
};

initCometChat();

  export {CometChatUIKit, CometChat, COMETCHAT_CONSTANTS};