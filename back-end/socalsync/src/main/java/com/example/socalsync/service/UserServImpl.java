package com.example.socalsync.service;

import com.example.socalsync.models.User;
import com.example.socalsync.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.security.Principal;
import java.util.Optional;

@Service
public class UserServImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServImpl(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
    public User register(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    @Override
    public void updateUser(User savedUser) {
        userRepository.save(savedUser);
    }

    @Override
    public User authenticate(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()){

            User user = optionalUser.get();
            if(passwordEncoder.matches(password, user.getPassword())){
                return user;
            }
        }
        throw new BadCredentialsException("Invalid credentials");
    }

    @Override
    public int getUserFromPrincipal(Principal principal) {
        String username = principal.getName();
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("user not found" + username));
        return user.getId();
    }


}

//Reference this GeeksforGeeks article to add BCryptPasswordEncoder.
//https://www.geeksforgeeks.org/advance-java/spring-security-implementation-of-bcryptpasswordencoder/
