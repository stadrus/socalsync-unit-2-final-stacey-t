package com.example.socalsync.controllers;


import com.example.socalsync.models.dto.EventDTO;
import com.example.socalsync.models.dto.EventResponseDTO;
import com.example.socalsync.service.EventService;
import com.example.socalsync.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin (origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/events")
public class EventController {


    private final EventService eventService;
    private final UserService userService;

    @Autowired
    public EventController(EventService eventService, UserService userService) {
        this.eventService = eventService;
        this.userService = userService;
    }

    //create Event
    //Endpoint http://localhost:8080/api/events/user/{userId}
    @PostMapping("/user")
    public ResponseEntity<?> createEvent(@RequestBody EventDTO eventDTO, Principal principal) {
        int authenticatedUserId = userService.getUserFromPrincipal(principal);
        EventResponseDTO createdEvent = eventService.createEvent(authenticatedUserId, eventDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
    }
    
    //Get all events
    //Endpoint http:localhost:8080/api/events/user/{userId}
    @GetMapping("/user")
    public ResponseEntity<?> getAllUserEvents(Principal principal) {
        int authenticatedUserId = userService.getUserFromPrincipal(principal);
        List<EventResponseDTO> events = eventService.getAllUserEventsByUserId(authenticatedUserId);
        return ResponseEntity.ok(events);
    }

    //GET Single Event
    //Endpoint http://localhost:8080/api/events/{eventId}
    @GetMapping("/{eventId}")
    public ResponseEntity<EventResponseDTO> getEventByID(@PathVariable int eventId) {
        EventResponseDTO event = eventService.getEventById(eventId);
        return ResponseEntity.ok(event);
    }

    //Update Event
    //Endpoint http://localhost:8080/api/events/{eventId}
    @PutMapping("/{eventId}")
    public ResponseEntity<EventResponseDTO> updateEvent(@PathVariable int eventId, @RequestBody EventDTO eventDTO) {
        EventResponseDTO updated = eventService.updateEvent(eventId, eventDTO);
        return ResponseEntity.ok(updated);
    }

    //Delete Event
    //Endpoint http://localhost:8080/api/events/{eventId}
    @DeleteMapping("/{eventId}")
    public ResponseEntity<String> deleteEvent(@PathVariable int eventId) {
        eventService.deleteEvent(eventId);
        return ResponseEntity.ok("Event deleted");
    }



}
