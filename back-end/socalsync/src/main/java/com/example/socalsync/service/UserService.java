package com.example.socalsync.service;

import com.example.socalsync.models.User;
import com.example.socalsync.models.dto.RegisterRequest;

import java.security.Principal;
import java.util.Optional;

//handles the logic related to user authentication and password
public interface UserService {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    User registerUser(RegisterRequest request);
    void updateUser(User user);
    User authenticate(String email, String password);
    int getUserFromPrincipal(Principal principal);
}