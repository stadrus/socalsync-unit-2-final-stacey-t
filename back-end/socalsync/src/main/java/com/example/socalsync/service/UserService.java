package com.example.socalsync.service;

import com.example.socalsync.models.User;

import java.security.Principal;
import java.util.Optional;

//handles the logic related to user authentication and password
public interface UserService {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    void updateUser(User user);
    User authenticate(String email, String password);
    User register(User user);
    int getUserFromPrincipal(Principal principal);
}