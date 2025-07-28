package com.example.socalsync.controllers;

import com.example.socalsync.models.CometChatService;
import com.example.socalsync.models.User;
import com.example.socalsync.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

    @RestController
    @RequestMapping("/api/user")
    public class UserController {
        @Autowired
        UserRepository userRepository;
        @Autowired
        private CometChatService cometChatService;

        //POST a new user one registration is complete
        //Endpoint http:localhost:8080/api/users/register
        @PostMapping("/register")
        public ResponseEntity<?> registerUser(@RequestBody User userRequest) {
            if (userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("User already exists");
            }

            try{
                //save user to MySQL
            User savedUser = userRepository.save(userRequest);

                //create CometChat UID
                String cometchatUID = userRequest.getEmail();
                String name = userRequest.getName();

                //register user with cometchat
                cometChatService.registerUserWithCometChat(cometchatUID, name);

                //save UID to user record and update
                savedUser.setCometchatUID(cometchatUID);
                userRepository.save(savedUser);
                return ResponseEntity.ok("User synced with CometChat");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user:" + e.getMessage());
            }

        }
    }
