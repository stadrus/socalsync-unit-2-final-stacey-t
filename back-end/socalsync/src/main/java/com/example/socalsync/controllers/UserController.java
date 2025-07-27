package com.example.socalsync.controllers;

import com.example.socalsync.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

    @RestController
    @RequestMapping("/api/user")
    public class UserController {
        @Autowired
        UserRepository userRepository;




        //POST a new user one registration is complete
        //Endpoint http:localhost:8080/api/users/register






        //POST /api/users/login




}
