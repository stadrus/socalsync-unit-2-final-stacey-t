package com.example.socalsync.controllers;


import com.example.socalsync.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin (origins = "*")
@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    EventRepository eventRepository;


}
