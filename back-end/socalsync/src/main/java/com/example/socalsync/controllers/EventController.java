package com.example.socalsync.controllers;


import com.example.socalsync.models.dto.EventDTO;
import com.example.socalsync.models.dto.EventResponseDTO;
import com.example.socalsync.service.EventService;
import com.example.socalsync.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private final EventService eventService;
    @Autowired
    private final UserService userService;

    @Autowired
    public EventController(EventService eventService, UserService userService) {
        this.eventService = eventService;
        this.userService = userService;
    }

    //Create Event
    //Endpoint http://localhost:8080/api/events/user/{userId}
    @PostMapping("/user/{userId}")
    public ResponseEntity<EventResponseDTO> createEvent(@PathVariable int userId, @RequestBody EventDTO eventDTO) {
        EventResponseDTO createdEvent = eventService.createEvent(userId, eventDTO);
        return ResponseEntity.ok(createdEvent);
    }

    //Get all events
    //Endpoint http:localhost:8080/api/events/user/{userId}
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EventResponseDTO>> getAllUserEvents(@PathVariable int userId) {
        List<EventResponseDTO> events = eventService.getAllUserEventsByUserId(userId);
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
    public ResponseEntity<?> deleteEvent(@PathVariable int eventId) {
        eventService.deleteEvent(eventId);
        return ResponseEntity.ok("Event deleted");
    }


}
