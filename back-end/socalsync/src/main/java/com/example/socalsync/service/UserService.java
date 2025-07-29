package com.example.socalsync.service;


import com.example.socalsync.models.User;
import com.example.socalsync.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
//handles the logic related to user authentication and password
@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public User register(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    public Optional<User> authenticate(String email, String password){
        return userRepository.findByEmail(email).filter(user -> passwordEncoder.matches(password, user.getPassword()));
    }
    public boolean existsByEmail(String email){
        return userRepository.findByEmail(email).isPresent();
    }
}
//Reference this GeeksforGeeks article to add BCryptPasswordEncoder.
//https://www.geeksforgeeks.org/advance-java/spring-security-implementation-of-bcryptpasswordencoder/
