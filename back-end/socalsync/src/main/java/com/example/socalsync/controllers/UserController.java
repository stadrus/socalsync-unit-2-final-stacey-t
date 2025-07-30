package com.example.socalsync.controllers;

import com.example.socalsync.models.dto.LoginRequest;
import com.example.socalsync.models.dto.RegisterRequest;
import com.example.socalsync.service.CometChatService;
import com.example.socalsync.models.User;

import com.example.socalsync.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
    @RequestMapping("/api/user")
    public class UserController {

    private final UserService userService;
    private final CometChatService cometChatService;

    @Autowired
    public UserController(UserService userService, CometChatService cometChatService) {
        this.userService = userService;
        this.cometChatService = cometChatService;
    }

    //POST a new user one registration is complete
    //Endpoint http:localhost:8081/api/users/register
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        if (userService.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        //save user to MySQL
        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword());


        User savedUser = userService.register(newUser);

        try {
            //save UID to user record and update
            cometChatService.registerUserWithCometChat(savedUser.getEmail(), savedUser.getName());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error registering user:" + e.getMessage());
        }
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public Optional<ResponseEntity<User>> loginUser(@RequestBody LoginRequest request) {
        return userService.authenticate(request.getEmail(), request.getPassword()).map(ResponseEntity::ok);
    }
}
