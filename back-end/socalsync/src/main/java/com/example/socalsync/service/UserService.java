package com.example.socalsync.service;


import com.example.socalsync.models.User;
import com.example.socalsync.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Objects;
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


    public User authenticate(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(passwordEncoder.matches(password, user.getPassword())){
                return user;
            }
        }
        throw new RuntimeException("Invalid credentials");
    }

    public boolean existsByEmail(String email){
        return userRepository.findByEmail(email).isPresent();
    }

    public Optional <User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void updateUser(User savedUser) {
        userRepository.save(savedUser);
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        UserService that = (UserService) o;
        return Objects.equals(userRepository, that.userRepository) && Objects.equals(passwordEncoder, that.passwordEncoder);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }


}
//Reference this GeeksforGeeks article to add BCryptPasswordEncoder.
//https://www.geeksforgeeks.org/advance-java/spring-security-implementation-of-bcryptpasswordencoder/
