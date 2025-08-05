package com.example.socalsync.service;

import com.example.socalsync.models.User;
import com.example.socalsync.models.dto.RegisterRequest;
import com.example.socalsync.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.Optional;
import java.util.UUID;
@Transactional
@Service
public class UserServImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CometChatService cometChatService;

@Autowired
    public UserServImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, CometChatService cometChatService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.cometChatService = cometChatService;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean existsByEmail(String email){
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public User registerUser(RegisterRequest request){
        if(existsByEmail(request.getEmail())){
            throw new IllegalArgumentException("Email already in use");
        }
        String cometchatUID = UUID.randomUUID().toString();
        request.setCometchatUID(cometchatUID);

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getName(),
                request.getEmail(),
                encodedPassword,
                cometchatUID
        );

        userRepository.save(user);

        cometChatService.registerUserWithCometChat(cometchatUID, request.getName());

        return user;
    }
    @Override
    public void updateUser(User savedUser) {
        userRepository.save(savedUser);
    }

    @Override
    public User authenticate(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .orElseThrow(()-> new BadCredentialsException("Invalid email or password"));
    }


    @Override
    public int getUserFromPrincipal(Principal principal) {
        String email = principal.getName();
        return userRepository.findByEmail(email)
                .map(User::getId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found:" + email));
    }


}

//Reference this GeeksforGeeks article to add BCryptPasswordEncoder.
//https://www.geeksforgeeks.org/advance-java/spring-security-implementation-of-bcryptpasswordencoder/
