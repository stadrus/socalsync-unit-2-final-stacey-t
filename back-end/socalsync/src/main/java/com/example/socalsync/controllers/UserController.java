package com.example.socalsync.controllers;

import com.example.socalsync.models.dto.LoginRequest;
import com.example.socalsync.models.dto.RegisterRequest;
import com.example.socalsync.service.CometChatService;
import com.example.socalsync.models.User;
import com.example.socalsync.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;



@CrossOrigin(origins = "http://localhost:5173")
@RestController
    @RequestMapping("/api/user")
    public class UserController {

    private final UserService userService;
    private final CometChatService cometChatService;

    @Value("${jwt.secret}")
    private String jwtSecret;


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
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {

        try {
             User user = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

            String jwt = Jwts.builder()
                    .setSubject(user.getEmail())
                    .claim("id", user.getId())
                    .claim("cometchatUID", user.getCometchatUID())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                    .signWith(SignatureAlgorithm.HS256, jwtSecret)
                    .compact();

            Map<String, String> response = new HashMap<>();
            response.put("token", jwt);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}
