import { useEffect } from "react"
import { COMETCHAT_CONSTANTS } from "../../cometchat.config";


const CometChatWidgetLoader = ({ uid }) => {
    useEffect(() =>{
        const initWidget = async () =>{
            if (!window.CometChatWidget) 
                return;
            try{
                await window.CometChatWidget.init({
                    AppId: COMETCHAT_CONSTANTS.APP_ID, 
                    Region: COMETCHAT_CONSTANTS.REGION, 
                    AuthKey: COMETCHAT_CONSTANTS.AUTH_KEY, 
                });
                await  window.CometChatWidget.login({ uid });

                await window.CometChatWidget.launch({
                    widgetID: COMETCHAT_CONSTANTS.WIDGET_ID,
                    docked: true,
                    alignment: "right", // or "left"
                    roundedCorners: true,
                    height: "600px",
                    width: "400px",       
                    defaultType: "default",
        });
      } catch (error) {
        console.error("CometChat Widget error:", error);
      }
    };

    initWidget();
  }, [uid]);

  return null;
};

export default CometChatWidgetLoader;