import ReactDOM from "react-dom/client";
import {
  CometChatUIKit,
  UIKitSettingsBuilder,
} from "@cometchat/chat-uikit-react";
import React from "react";
import App from "App";
import { setupLocalization } from "CometChat/utils/utils";
import cometChatLogo from "../src/CometChat/assets/cometchat_logo.svg";
import { CometChatProvider } from "CometChat/context/CometChatContext";
/**
 * CometChat application constants
 * @constant {Object} COMETCHAT_CONSTANTS
 * @property {string} APP_ID - CometChat application ID
 * @property {string} REGION - CometChat region
 * @property {string} AUTH_KEY - CometChat authentication key
 */
export const COMETCHAT_CONSTANTS = {
  APP_ID: "27925714ca768ccc",
  REGION: "us",
  AUTH_KEY: "6a305aa227d72ee88b4be58a800cf7cc4269de77",
};

/**
 * Initialize CometChat if credentials are available, otherwise render the app directly.
 */
if (
  COMETCHAT_CONSTANTS.APP_ID &&
  COMETCHAT_CONSTANTS.REGION &&
  COMETCHAT_CONSTANTS.AUTH_KEY
) {
  const uiKitSettings = new UIKitSettingsBuilder()
    .setAppId(COMETCHAT_CONSTANTS.APP_ID)
    .setRegion(COMETCHAT_CONSTANTS.REGION)
    .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
    .subscribePresenceForAllUsers()
    .build();

  /**
   * Initialize CometChat UIKit and render the application inside the CometChatProvider.
   */
  CometChatUIKit.init(uiKitSettings)?.then((response) => {
    setupLocalization();
    const root = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement
    );
    root.render(
      <CometChatProvider>
        <App />
      </CometChatProvider>
    );
  });
} else {
  /**
   * If credentials are missing, render the app without initializing CometChat.
   */
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <div className="App" style={{ gap: "20px" }}>
      <div className="cometchat-credentials__logo">
        <img src={cometChatLogo} alt="CometChat Logo" />
      </div>
      <div className="cometchat-credentials__header">
        CometChat App credentials are missing. Please add them in{" "}
        <code>index.tsx</code> to continue.
      </div>
    </div>
  );
}
