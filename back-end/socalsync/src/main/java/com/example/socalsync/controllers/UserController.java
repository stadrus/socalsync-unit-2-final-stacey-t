package com.example.socalsync.controllers;

import com.example.socalsync.models.dto.LoginRequest;
import com.example.socalsync.models.dto.RegisterRequest;
import com.example.socalsync.service.CometChatService;
import com.example.socalsync.models.User;
import com.example.socalsync.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;


@CrossOrigin(origins = "*")
@RestController
    @RequestMapping("/api/user")
    public class UserController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final CometChatService cometChatService;

    private UserController(UserService userService, CometChatService cometChatService) {
        this.userService = userService;
        this.cometChatService = cometChatService;
    }

    //POST a new user one registration is complete
    //Endpoint http://localhost:8080/api/user/register
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

        String cometchatUID = "user_" + savedUser.getId();
        savedUser.setCometchatUID(cometchatUID);
        userService.updateUser(savedUser);

        try {
            //save UID to user record and update
            cometChatService.registerUserWithCometChat(cometchatUID, savedUser.getName());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error registering user:" + e.getMessage());
        }
        return ResponseEntity.ok(savedUser);
    }
    //Endpoint http://localhost:8080/api/users/login
    @PostMapping("/login")
    public Optional<ResponseEntity<User>> loginUser(@RequestBody LoginRequest loginRequest) {
        return userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword()).map(ResponseEntity::ok);
    }
}
