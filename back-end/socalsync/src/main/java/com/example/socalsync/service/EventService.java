package com.example.socalsync.service;

import com.example.socalsync.models.Event;
import com.example.socalsync.models.User;
import com.example.socalsync.models.dto.EventDTO;
import com.example.socalsync.models.dto.EventResponseDTO;
import com.example.socalsync.repositories.EventRepository;
import com.example.socalsync.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventService(EventRepository eventRepository, UserRepository userRepository){
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }
    public EventResponseDTO createEvent(int userId, EventDTO eventDTO) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Event event = new Event();
        event.setTitle(eventDTO.getTitle());
        event.setDescription(eventDTO.getDescription());
        event.setEventDateTime(eventDTO.getEventDateTime());
        event.setLocation(eventDTO.getLocation());
        event.setUser(userOptional.get());

        Event saved = eventRepository.save(event);
        return mapToResponseDTO(saved);
    }




    public List<EventResponseDTO> getUserEvents(int userId) {
        return eventRepository.findByUserId(userId).stream().map(this::mapToResponseDTO).collect(Collectors.toList());
    }
    public EventResponseDTO updateEvent(int eventId, EventDTO eventDTO){
        Event event = eventRepository.findById(eventId).orElseThrow(()-> new RuntimeException("Event not found"));

        event.setTitle(eventDTO.getTitle());
        event.setDescription(eventDTO.getDescription());
        event.setEventDateTime(eventDTO.getEventDateTime());

        Event updated = eventRepository.save(event);

        return mapToResponseDTO(updated);
    }
    public void deleteEvent(int eventId){
        if (!eventRepository.existsById(eventId)){
            throw new RuntimeException("Event not found ");
        }
        eventRepository.deleteById(eventId);
    }

    private EventResponseDTO mapToResponseDTO(Event event) {
        EventResponseDTO dto = new EventResponseDTO();
        dto.setEventId(event.getEventId());
        dto.setTitle(event.getTitle());
        dto.setDescription(event.getDescription());
        dto.setEventDateTime(event.getEventDateTime());
        dto.setLocation(event.getLocation());
        return dto;
    }


    public List<EventResponseDTO> getAllUserEventsByUserId(int userId) {
    return null;
    }

    public EventResponseDTO getEventById(int eventId) {
        return null;
    }
}
