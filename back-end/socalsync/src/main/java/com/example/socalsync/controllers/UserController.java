package com.example.socalsync.controllers;

import com.example.socalsync.models.dto.LoginRequest;
import com.example.socalsync.models.dto.RegisterRequest;
import com.example.socalsync.models.dto.UserResponseDTO;
import com.example.socalsync.security.JWTService;
import com.example.socalsync.service.CometChatService;
import com.example.socalsync.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import com.example.socalsync.models.User;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @RestController
    @RequestMapping("/api/user")
    public class UserController {

    private final UserService userService;
    private final CometChatService cometChatService;
    private final JWTService jwtService;

    @Autowired
    public UserController(UserService userService, CometChatService cometChatService, JWTService jwtService) {
        this.userService = userService;
        this.cometChatService = cometChatService;
        this.jwtService = jwtService;
    }

    //POST a new user one registration is complete
    //Endpoint http://localhost:8080/api/user/register
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        if (userService.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }

        //save user to MySQL
        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword());
        newUser.setCometchatUID(request.getCometchatUID());


        User savedUser = userService.registerUser(request);

        if (savedUser.getId() == 0 ) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("User Id failed");
        }

        String cometchatUID = "user_" + savedUser.getId();
        savedUser.setCometchatUID(cometchatUID);
        userService.updateUser(savedUser);

        try {
            //save UID to user record and update
            cometChatService.registerUserWithCometChat(cometchatUID, savedUser.getName());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error registering user:" + e.getMessage());
        }


        return ResponseEntity.ok(new UserResponseDTO(savedUser));
    }

    //Endpoint http://localhost:8080/api/user/login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {

        try {
             User user = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
             String jwt = jwtService.generatedToken(user);

            UserResponseDTO loginDTO = new UserResponseDTO(
                    user.getId(),
                    user.getEmail(),
                    user.getName(),
                    user.getCometchatUID()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("user", loginDTO);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
        //Endpoint http://localhost:8080/api/user/me
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        Optional<User> optionalUser = userService.findByEmail(principal.getName());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = optionalUser.get();

        UserResponseDTO meDTO = new UserResponseDTO(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getCometchatUID()
        );

        return ResponseEntity.ok(meDTO);
    }
}

