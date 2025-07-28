package com.example.socalsync.models;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

//The goal of this class is to automatically register a user into CometChat while registering for SoCalSync.

//This code uses the CometChatUIKitLoginListener.getLoggedInUser() method from CometChatSelector.jsx to get the current user and displays a conversation list. Stores the current loggedIn user and tracks the selected conversation in the Chat side of the dashboard.

// CometChat API-Service
@Service
public class CometChatService {


    //Stored Env Var to hide APP ID and API Key
    @Value("${CHAT_APP_ID}")
    private String appId;
    @Value("${CHAT_API_KEY}")
    private String apiKey;

    private static final String COMETCHAT_URL = "https://api-us.cometchat.io/v3/users";

    public void registerUserWithCometChat (String uid, String name){
        RestTemplate restTemplate = new RestTemplate();

      //build headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("appId", appId);
        headers.set("apiKey", apiKey);
        //build request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("uid", uid);
        requestBody.put("name", name);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try{
            ResponseEntity<String>response = restTemplate.postForEntity(COMETCHAT_URL, request, String.class);
            if (!response.getStatusCode().is2xxSuccessful()){
                throw new RuntimeException("CometChat registration failed. Code:" + response.getStatusCode());
            }

        } catch (RestClientException e) {
            throw new RuntimeException("Failed to register with CometChat: " + e.getMessage());
        }
    }
}
//Issues and Struggles with this model...
// I imported the Hibernate "Map" object that was not compatible with the java.util. I also ran into the same issues with HTTPHeaders. Leaned heavily on the CometChat Doc to create build headers.

// References
// https://www.cometchat.com/docs/ui-kit/react/react-js-integration
//https://medium.com/free-code-camp/building-a-modern-chat-application-with-react-js-558896622194