package com.example.socalsync.controllers;

import com.example.socalsync.models.dto.LoginRequest;
import com.example.socalsync.models.dto.RegisterRequest;
import com.example.socalsync.service.CometChatService;
import com.example.socalsync.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import com.example.socalsync.models.User;
import javax.crypto.SecretKey;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
    @RequestMapping("/api/user")
    public class UserController {

    private final UserService userService;
    private final CometChatService cometChatService;

    @Value("${jwt.secret}")
    private String jwtSecret;

@Autowired
    public UserController(UserService userService, CometChatService cometChatService) {
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

            Map<String, Object> userDTO = Map.of(
                    "id", savedUser.getId(),
                    "name", savedUser.getName(),
                    "email", savedUser.getEmail(),
                    "cometChatID", savedUser.getCometchatUID()

            );

        return ResponseEntity.ok(userDTO);
    }

    //Endpoint http://localhost:8080/api/user/login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {

        try {
             User user = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
            SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

            String jwt = Jwts.builder()
                    .setSubject(user.getEmail())
                    .claim("id", user.getId())
                    .claim("cometchatUID", user.getCometchatUID())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                    .signWith(key, SignatureAlgorithm.HS256)
                    .compact();

            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("user", Map.of(
                    "id", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "cometChatID", user.getCometchatUID()
            ));
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

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

        Map<String, Object> userDTO = Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "name", user.getName(),
                "cometChatID", user.getCometchatUID()
        );

        return ResponseEntity.ok(userDTO);
    }
}

