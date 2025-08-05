import { CometChatUIKit, UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";
import { COMETCHAT_CONSTANTS } from "../../cometchat.config";

const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID) 
  .setRegion(COMETCHAT_CONSTANTS.REGION) 
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY) 
  .subscribePresenceForAllUsers() 
  .build(); 


CometChatUIKit.init(UIKitSettings)
  .then(() => {
    console.log("CometChat UI Kit initialized successfully.");
  
  })
  .catch((error) => {
    console.error("CometChat UI Kit initialization failed:", error); // Log errors if initialization fails
  });

  export {CometChatUIKit, COMETCHAT_CONSTANTS};